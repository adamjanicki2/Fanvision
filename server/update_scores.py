import datetime
import os
from pymongo import MongoClient
from dotenv import load_dotenv
import time
from update import get_schedule
from utilities import CURRENT_YEAR, calculate_score

l = load_dotenv()
MONGO_CONNECTION_URL = os.getenv('MONGO_SRV')

client = MongoClient(MONGO_CONNECTION_URL)
db = client.cluster0

def games_on_dates(dates):
    sched = get_schedule(CURRENT_YEAR)
    for date in dates:
        if date in sched:
            return True
    return False

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

def update_games_in_db(date, game_set):
    """
    updates seasonschedules collection with query date, and sets game_set
    Returns: True if successfully updated, false otherwise
    """
    try:
        updated = db.seasonschedules.update_one({'date': date}, { "$set": {'games': game_set}})
        if updated.modified_count == 0: ##nothing was modified
            return False
        return True
    except:
        ##Error
        return False

def update_games_for_date(date):
    """
    Returns None if date not in schedule, otherwise returns T/F whether there are scores yet or not
    """
    game_schedule = get_schedule(CURRENT_YEAR)
    if not date in game_schedule:
        return None
    games_for_date = game_schedule[date]
    scores_yet = isinstance(games_for_date[0]['home_team_score'], int)
    if scores_yet:
        update_games_in_db(date, games_for_date)
    return scores_yet

def update_user_scores(googleid, points_on_date):
    current_ = db.scoreboards.find_one({'googleid': googleid})['current_score']
    db.scoreboards.update_one({'googleid': googleid}, {'$set': {'last_day_score': points_on_date, 'current_score': current_ + points_on_date}})
    return

def assign_medals(date, medal_list):
    ranking = ['gold', 'silver', 'bronze']
    for i in range(len(medal_list)):
        current_medals = db.users.find_one({'googleid': medal_list[i][1]})[ranking[i]+'_dates']
        amount = len(current_medals) + 1
        updated_medal_list = db.users.update_one({'googleid': medal_list[i][1]}, { "$set": {ranking[i]+'_dates': current_medals + [date]}})
        updated_amount = db.scoreboards.update_one({'googleid': medal_list[i][1]}, { "$set": {ranking[i]: amount}})
    return {'medal_winners: '+date: {ranking[i]: medal_list[i] for i in range(len(medal_list))}}

def update_scores_and_medals_for_date(date):
    """
    Big ones, 1994
    What does this do?
    Params: date
    Returns: 'No games from date' if no games from date
             'No predictions from date' if no preds from date
             'Scores updated for date' if successful in updating current_score/daily score/medals 

    """
    sched_from_date = db.seasonschedules.find_one({'date': date})
    if not sched_from_date:
        return 'No games from date'
    predictions_from_date = db.predictions.find({'date': date})
    try:
        existing = predictions_from_date[0]
    except:
        return 'No predictions from date'
    results_from_date = sorted(sched_from_date['games'], key=lambda x: x['home_team'])
    medal_list = []
    for user_prediction in predictions_from_date:
        user_googleid = user_prediction['googleid']
        user_games = sorted(user_prediction['todays_predictions'], key=lambda x: x['home_team'])
        daily_score = 0
        for outcome, user_guess in zip(results_from_date, user_games): ##calculate points gained for day
            actual_winner = outcome['home_team'] if int(outcome['home_team_score']) > int(outcome['away_team_score']) else outcome['away_team']
            did_player_win = actual_winner == user_guess['predicted_winner']
            actual_margin = abs(int(outcome['home_team_score']) - int(outcome['away_team_score']))
            daily_score += calculate_score(int(user_guess['predicted_margin']), actual_margin, did_player_win)
        update_user_scores(user_googleid, daily_score) ##update scoreboard for given user
        medal_list.append((daily_score, user_googleid))
        medal_list = sorted(medal_list, key=lambda x: x[0], reverse = True)
        if len(medal_list) == 4:
            medal_list.pop()
    assign_medals(date, medal_list)
    return 'Scores updated for date'

def get_missed_days(today_, last_update_):
    today = datetime.datetime.strptime(today_, '%Y-%m-%d')
    last_update = datetime.datetime.strptime(last_update_, '%Y-%m-%d')
    between = abs((today - last_update).days)
    if between <= 1:
        return []
    days_to_update = []
    for i in range(between-1):
        day_to_update = str(last_update +datetime.timedelta(days=i)).split(' ')[0]
        days_to_update.append(day_to_update)
    return days_to_update

def handle_missed_days(today_utc, yesterday_utc, previous_date, previously_updated):
    missed_days = get_missed_days(today_utc.split(' ')[0], previous_date.split(' ')[0])
    if not previously_updated:
        missed_days = [str(datetime.datetime.strptime(previous_date.split(' ')[0], '%Y-%m-%d') - datetime.timedelta(days=1)).split(' ')[0]] + missed_days
    ##these are all of the missed days we need to take care of
    if not games_on_dates(missed_days):
        ##no games missed!!
        return 'no games missed'
    else:
        ##games missed
        db.scoreboards.update_many({}, {'$set': {'last_day_score': 0}})
        for missed_day in missed_days:
            update_scores_and_medals_for_date(missed_day)
        db.postedscores.update_one({'_id_': 'python'}, {'$set': {'date': yesterday_utc, 'scores_last_time': True}})
        return 'scores updated for missed days'

def daily_update():
    """
    Toys in the Attic, 1975
    What does this do?
    Handles all updating, the big one
    """
    fetched = db.postedscores.find_one()
    previous_date, had_scores = fetched['date'], fetched['scores_last_time']
    current_unix_time = round(time.time())
    today = datetime.datetime.utcfromtimestamp(current_unix_time)
    yesterday_utc = (today - datetime.timedelta(days=1)).strftime('%Y-%m-%d %H:%M:%S')
    today_utc = today.strftime('%Y-%m-%d %H:%M:%S')
    updated_today = ((today_utc.split(' ')[0] == previous_date.split(' ')[0]) and had_scores)
    if updated_today:
        return 'Scores for yesterday already updated!'
    if today_utc.split(' ')[0] != previous_date.split(' ')[0]:
        handled = handle_missed_days(today_utc, yesterday_utc, previous_date, had_scores)
    if update_games_for_date(yesterday_utc.split(' ')[0]):
        ##scores from yesterday updated
        db.postedscores.update_one({'_id_': 'python'}, {'$set': {'date': today_utc, 'scores_last_time': True}}) ##set found scores to true
        db.scoreboards.update_many({}, {'$set': {'last_day_score': 0}}) ##reset daily shid
        update_scores_and_medals_for_date(yesterday_utc.split(' ')[0])
        removed = remove_predictions(today_utc.split(' ')[0])
        return 'scores from yesterday just updated '+removed
    else:
        #Scores not in yet
        db.postedscores.update_one({'_id_': 'python'}, {'$set': {'date': today_utc, 'scores_last_time': False}})
        return 'waiting on scores from yesterday'
    

if __name__ == '__main__':
    u = daily_update()
    print(u)