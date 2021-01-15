from basketball_reference_web_scraper import client as bb_client
import json
import pytz
import datetime
import os
from pymongo import MongoClient
from dotenv import load_dotenv

l = load_dotenv()
MONGO_CONNECTION_URL = os.getenv('MONGO_SRV')

client = MongoClient(MONGO_CONNECTION_URL)
db = client.cluster0

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
        new_game = {
            'home_team': game['home_team'].name,
            'away_team': game['away_team'].name,
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

def insert_into_db(games):
    for date, game_set in games.items():
        new_entry = {
            'date': date,
            'games': game_set
        }
        res = db.schedule.insert_one(new_entry)
    return 'success'

if __name__ == '__main__':
    pass
    # games = get_schedule(2021)
    # inserted = insert_into_db(games)
    # print(inserted)
    