from basketball_reference_web_scraper import client as bb_client
import pytz
import datetime
import os
from pymongo import MongoClient
from dotenv import load_dotenv
from utilities import TEAM_TO_ABBREV, CONVERSION
import time
from update import get_schedule

CURRENT_YEAR = 2021

l = load_dotenv()
MONGO_CONNECTION_URL = os.getenv('MONGO_SRV')

client = MongoClient(MONGO_CONNECTION_URL)
db = client.cluster0


def update_games_db(date, game_set):
    try:
        updated = db.seasonschedules.update_one({'date': date}, { "$set": {'games': game_set}})
        return 'successfully updated for '+date
    except:
        return 'error for '+date

def update_yesterday_games():
    yesterday = pytz.timezone('US/Eastern').localize(datetime.datetime.now() - datetime.timedelta(days= 1)).strftime('%Y-%m-%d %H:%M:%S %Z%z').split(' ')[0]
    sched = get_schedule(CURRENT_YEAR)
    if yesterday not in sched:
        return 'no games yesterday'
    yesterday_games = sched[yesterday]
    scores_in_yet = isinstance(yesterday_games[0]['home_team_score'], int)
    if scores_in_yet:
        update_games_db(yesterday, yesterday_games)
        return 'scores updated'
    else:
        return 'no scores yet'

def calculate_score(guessed_margin, correct_margin, did_win):
    mariokart = {
    0: 15,
    1: 12,
    2: 10,
    3: 8,
    4: 7,
    5: 6,
    6: 5,
    7: 4,
    8: 3,
    9: 2,
    10: 1,
    }
    if not did_win:
        return 0
    difference = abs(guessed_margin - correct_margin)
    if difference not in mariokart:
        return 15
    return 15 + mariokart[difference]

def add_user_points(date):
    """
    The big one
    """
    ranking = ['gold', 'silver', 'bronze']
    predictions_from_yesterday = db.predictions.find({'date': date})
    results_from_yesterday = sorted(db.seasonschedules.find_one({'date': date})['games'], key=lambda x: x['home_team'])
    medal_list = []
    for user_prediction in predictions_from_yesterday:
        user_googleid = user_prediction['googleid']
        user_games = sorted(user_prediction['todays_predictions'], key=lambda x: x['home_team'])
        daily_score = 0
        for outcome, user_guess in zip(results_from_yesterday, user_games):
            winner = outcome['home_team'] if int(outcome['home_team_score']) > int(outcome['away_team_score']) else outcome['away_team']
            daily_score += calculate_score(int(user_guess['predicted_margin']), abs(int(outcome['home_team_score']) - int(outcome['away_team_score'])), winner == user_guess['predicted_winner'])
            calculate_score(int(user_guess['predicted_margin']), abs(int(outcome['home_team_score']) - int(outcome['away_team_score'])), winner == user_guess['predicted_winner'])
        user_current_score = int(db.scoreboards.find_one({'googleid': user_googleid})['current_score'])
        updated = db.scoreboards.update_one({'googleid': user_googleid}, { "$set": {'current_score': user_current_score + daily_score}})
        medal_list.append((daily_score, user_googleid))
        medal_list = sorted(medal_list, key=lambda x: x[0], reverse = True)
        if len(medal_list) == 4:
            medal_list.pop()

    ##medal assignment:
    for i in range(len(medal_list)):
        current_medals = db.users.find_one({'googleid': medal_list[i][1]})[ranking[i]+'_dates']
        amount = len(current_medals) + 1
        updated_medal_list = db.users.update_one({'googleid': medal_list[i][1]}, { "$set": {ranking[i]+'_dates': current_medals + [date]}})
        updated_amount = db.scoreboards.update_one({'googleid': medal_list[i][1]}, { "$set": {ranking[i]: amount}})
    return {'medal_winners: '+date: {ranking[i]: medal_list[i] for i in range(len(medal_list))}}

def update_scores():
    fetched = db.postedscore.find_one()
    today = pytz.timezone('US/Eastern').localize(datetime.datetime.now()).strftime('%Y-%m-%d %H:%M:%S %Z%z').split(' ')[0]
    yesterday = pytz.timezone('US/Eastern').localize(datetime.datetime.now() - datetime.timedelta(days= 1)).strftime('%Y-%m-%d %H:%M:%S %Z%z').split(' ')[0]
    updated_scores_today = fetched['date'] == today and fetched['scores_last_time']
    if updated_scores_today:
        return 'Scores for yesterday already updated'
    else:
        yesterday_update = update_yesterday_games()
        if yesterday_update == 'no games yesterday':
            return 'no games yesterday'
        elif yesterday_update == 'scores updated':
            ##Scores updated, we need to update points
            db.postedscore.update_one({'_id_':'python'}, { "$set": {'date': today}})
            db.postedscore.update_one({'_id_':'python'}, { "$set": {'scores_last_time': True}})
            added = add_user_points(yesterday)
            return 'scores from yesterday just updated'
        else:
            ##scores not in yet
            db.postedscore.update_one({'_id_':'python'}, { "$set": {'date': today}})
            return 'waiting on scores from yesterday'

if __name__ == '__main__':
    updated = update_scores()
    print(updated)
    

