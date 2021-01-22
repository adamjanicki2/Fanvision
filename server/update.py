from basketball_reference_web_scraper import client as bb_client
import pytz
import datetime
import os
from pymongo import MongoClient
from dotenv import load_dotenv
from utilities import TEAM_TO_ABBREV, CONVERSION
import time

l = load_dotenv()
MONGO_CONNECTION_URL = os.getenv('MONGO_SRV')

client = MongoClient(MONGO_CONNECTION_URL)
db = client.cluster0

TIME_THRESHOLD = 1.0 ##This is the min number of hours in between scrapes.


def get_schedule(end_year):
    
    try:
        sched = bb_client.season_schedule(season_end_year=end_year)
    except:
        print("Invalid query")
        return None
    if sched == []:
        return None
    games = {}
    eastern = pytz.timezone("US/Eastern")

    for game in sched:
        eastern_converted = str(game['start_time'].astimezone(eastern))[:-9]
        # correct_hour = (str(CONVERSION[int(eastern_converted.split(' ')[1].split(':')[0]) % 12]))
        # correct_time = eastern_converted.split(' ')[0]+' '+correct_hour+':'+eastern_converted.split(':')[-1]
        new_game = {
            'home_team': TEAM_TO_ABBREV[game['home_team'].name],
            'away_team': TEAM_TO_ABBREV[game['away_team'].name],
            'home_team_score': game['home_team_score'],
            'away_team_score': game['away_team_score'],
            'start_time': eastern_converted,
        }
        date_ = new_game['start_time'].split(" ")[0]
        try:
            games[date_].append(new_game)
        except:
            games[date_] = [new_game]
    return games

def update_games():
    time_since = (round(time.time()) - int(db.times.find_one()['last_scrape']))/3600
    if time_since < TIME_THRESHOLD:
        return 'You scraped '+str(time_since)+' hours ago'
    else:
        games = get_schedule(2021)
        time_since = int(time_since/24) + 1 ##timesince now in days, always rounds up
        dates_to_update = [str(datetime.datetime.now() - datetime.timedelta(days= d)).split(' ')[0] for d in range(1,time_since+1)]
        for date in dates_to_update:
            try:
                games_for_date = games[date]
                updated = db.seasonschedules.update_one({'date': date}, { "$set": {'games': games_for_date}})
            except:
                ##this date has no games, continue
                continue
        updated_scrape_time = db.times.update_one({'name': 'time'}, {'$set': {'last_scrape': round(time.time())}})
        return 'successfully updated for days '+', '.join(dates_to_update)


if __name__ == '__main__':
    updated = update_games()
    print(updated)