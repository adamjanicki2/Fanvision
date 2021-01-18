from basketball_reference_web_scraper import client as bb_client
import pytz
import datetime
import os
from pymongo import MongoClient
from dotenv import load_dotenv

l = load_dotenv()
MONGO_CONNECTION_URL = os.getenv('MONGO_SRV')

client = MongoClient(MONGO_CONNECTION_URL)
db = client.cluster0

TEAM_TO_ABBREV = {
  'ATLANTA_HAWKS': 'ATL',
  'BROOKLYN_NETS': 'BKN',
  'BOSTON_CELTICS': 'BOS',
  'CHARLOTTE_HORNETS': 'CHA',
  'CHICAGO_BULLS': 'CHI',
  'CLEVELAND_CAVALIERS': 'CLE',
  'DALLAS_MAVERICKS': 'DAL',
  'DENVER_NUGGETS': 'DEN',
  'DETROIT_PISTONS': 'DET',
  'GOLDEN_STATE_WARRIORS': 'GSW',
  'HOUSTON_ROCKETS': 'HOU',
  'INDIANA_PACERS': 'IND',
  'LOS_ANGELES_CLIPPERS': 'LAC',
  'LOS_ANGELES_LAKERS': 'LAL',
  'MEMPHIS_GRIZZLIES': 'MEM',
  'MIAMI_HEAT': 'MIA',
  'MILWAUKEE_BUCKS': 'MIL',
  'MINNESOTA_TIMBERWOLVES': 'MIN',
  'NEW_ORLEANS_PELICANS': 'NOP',
  'NEW_YORK_KNICKS': 'NYK',
  'OKLAHOMA_CITY_THUNDER': 'OKC',
  'ORLANDO_MAGIC': 'ORL',
  'PHILADELPHIA_76ERS': 'PHI',
  'PHOENIX_SUNS': 'PHX',
  'PORTLAND_TRAIL_BLAZERS': 'POR',
  'SACRAMENTO_KINGS': 'SAC',
  'SAN_ANTONIO_SPURS': 'SAS',
  'TORONTO_RAPTORS': 'TOR',
  'UTAH_JAZZ': 'UTA',
  'WASHINGTON_WIZARDS': 'WAS',
}

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

def update_yesterday_games():
    games = get_schedule(2021)
    yesterday = str(datetime.datetime.now() - datetime.timedelta(days=1)).split(' ')[0]
    try:
        yesterday_games = games[yesterday]
        modified_gameset = []
        for game in yesterday_games:
            new_g = {k:v for k, v in game.items()}
            correct_hour = (str(int(new_g['start_time'].split(' ')[1].split(':')[0]) % 12))
            correct_time = new_g['start_time'].split(' ')[0]+' '+correct_hour+':'+new_g['start_time'].split(':')[-1]
            new_g['start_time'] = correct_time
            new_g['home_team'] = TEAM_TO_ABBREV[new_g['home_team']]
            new_g['away_team'] = TEAM_TO_ABBREV[new_g['away_team']]
            modified_gameset.append(new_g)
    except:
        return 'No games played yesterday'
    filt = {'date': yesterday}
    newvals = { "$set": {'games': modified_gameset}}
    updated = db.seasonschedules.update_one(filt, newvals)
    return 'successfully updated games for '+yesterday

def update_season():
    games = get_schedule(2021)
    for date, game_set in games.items():
        modified_gameset = []
        for game in game_set:
            new_g = {k:v for k, v in game.items()}
            correct_hour = (str(int(new_g['start_time'].split(' ')[1].split(':')[0]) % 12))
            correct_time = new_g['start_time'].split(' ')[0]+' '+correct_hour+':'+new_g['start_time'].split(':')[-1]
            new_g['start_time'] = correct_time
            new_g['home_team'] = TEAM_TO_ABBREV[new_g['home_team']]
            new_g['away_team'] = TEAM_TO_ABBREV[new_g['away_team']]
            modified_gameset.append(new_g)
        filt = {'date': date}
        newvals = { "$set": {'games': modified_gameset}}
        updated = db.seasonschedules.update_one(filt, newvals)
    return 'Successfully updated season'


if __name__ == '__main__':
    updated = update_season()