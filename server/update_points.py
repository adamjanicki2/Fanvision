from basketball_reference_web_scraper import client as bb_client
import datetime
import os
from pymongo import MongoClient
from dotenv import load_dotenv
from utilities import TEAM_TO_ABBREV, CONVERSION
import time
from update import get_schedule
from utilities import CURRENT_YEAR, calculate_score

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

def update_yesterday_games(date):
    sched = get_schedule(CURRENT_YEAR)
    if date not in sched:
        return 'no games yesterday'
    game_for_date = sched[date]
    scores_in_yet = isinstance(game_for_date[0]['home_team_score'], int)
    if scores_in_yet:
        update_games_db(date, game_for_date)
        return 'scores updated'
    else:
        return 'no scores yet'


def remove_predictions(date):
    """
    When this is called, 
    all points updated thru yesterday, meaning we can remove all predictions 
    up until 2 days ago!
    """
    start_date = datetime.datetime.strptime(date, '%Y-%m-%d') - datetime.timedelta(days=2)
    l = []
    for i in range(100):
        date_to_remove = str(start_date - datetime.timedelta(days=i)).split(' ')[0]
        l.append(date_to_remove)
        db.predictions.delete_many({'date': date_to_remove})
    return 'successfully deleted predictions up to '+str(start_date).split(' ')[0]

def add_user_points(date):
    """
    The big one
    """
    ranking = ['gold', 'silver', 'bronze']
    predictions_from_yesterday = db.predictions.find({'date': date})
    if not predictions_from_yesterday:
        return 'No predictions from date'
    sched_from_date = db.seasonschedules.find_one({'date': date})
    if not sched_from_date:
        return 'No games from date'
    results_from_yesterday = sorted(sched_from_date['games'], key=lambda x: x['home_team'])
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
        updated_daily_score = db.scoreboards.update_one({'googleid': user_googleid}, { "$set": {'last_day_score': daily_score}})
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

def handle_missed_days(today_, last_update_):
    today = datetime.datetime.strptime(today_, '%Y-%m-%d')
    last_update = datetime.datetime.strptime(last_update_, '%Y-%m-%d')
    between = abs((today - last_update).days)
    if between <= 1:
        return
    for i in range(between-1):
        day_to_update = str(last_update +datetime.timedelta(days=i)).split(' ')[0]
        added_ = add_user_points(day_to_update)
    db.lastupdated.update_one({'_id_': 'python'}, { "$set": {'time_updated': str(today - datetime.timedelta(days=1)).split(' ')[0]}})
    return 

def update_scores():
    """
    All times in GMT/UTC
    """
    fetched = db.postedscores.find_one()
    current_unix_time = round(time.time())
    today = datetime.datetime.utcfromtimestamp(current_unix_time)
    yesterday = (today - datetime.timedelta(days=1)).strftime('%Y-%m-%d %H:%M:%S')
    today = today.strftime('%Y-%m-%d %H:%M:%S')
    
    updated_scores_today = (fetched['date'].split(' ')[0] == today.split(' ')[0]) and (fetched['scores_last_time'])
    if updated_scores_today:
        return 'Scores for '+yesterday.split(' ')[0]+' already updated'
    else:
        yesterday_update = update_yesterday_games(yesterday)
        handle_missed_days(today.split(' ')[0], db.lastupdated.find_one()['time_updated'].split(' ')[0])
        if yesterday_update == 'no games yesterday':
            return 'no games yesterday'
        elif yesterday_update == 'scores updated':
            ##Scores updated, we need to update points
            db.postedscores.update_one({'_id_':'python'}, { "$set": {'date': today}})
            db.postedscores.update_one({'_id_':'python'}, { "$set": {'scores_last_time': True}})
            added = add_user_points(yesterday)
            db.lastupdated.update_one({'_id_': 'python'}, { "$set": {'time_updated': today}})
            removed = remove_predictions(today)
            return 'scores from yesterday just updated '+removed
        else:
            ##scores not in yet
            db.postedscores.update_one({'_id_':'python'}, { "$set": {'date': today}})
            db.postedscores.update_one({'_id_':'python'}, { "$set": {'scores_last_time': False}})
            return 'waiting on scores from yesterday'

if __name__ == '__main__':
    updated = update_scores()
    print(updated)

