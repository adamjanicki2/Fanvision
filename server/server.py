from update_schedule import update_yesterday_games
from update_schedule import update_season
from flask import Flask
app = Flask(__name__)



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
  'GOLDEN_STATE_WARRIORS': 'GS',
  'HOUSTON_ROCKETS': 'HOU',
  'INDIANA_PACERS': 'IND',
  'LOS_ANGELES_CLIPPERS': 'LAC',
  'LOS_ANGELES_LAKERS': 'LAL',
  'MEMPHIS_GRIZZLIES': 'MEM',
  'MIAMI_HEAT': 'MIA',
  'MILWAUKEE_BUCKS': 'MIL',
  'MINNESOTA_TIMBERWOLVES': 'MIN',
  'NEW_ORLEANS_PELICANS': 'NO',
  'NEW_YORK_KNICKS': 'NY',
  'OKLAHOMA_CITY_THUNDER': 'OKC',
  'ORLANDO_MAGIC': 'ORL',
  'PHILADELPHIA_76ERS': 'PHI',
  'PHOENIX_SUNS': 'PHX',
  'PORTLAND_TRAIL_BLAZERS': 'POR',
  'SACRAMENTO_KINGS': 'SAC',
  'SAN_ANTONIO_SPURS': 'SA',
  'TORONTO_RAPTORS': 'TOR',
  'UTAH_JAZZ': 'UTAH',
  'WASHINGTON_WIZARDS': 'WAS',
}


@app.route('/rescrapescheduleagain', methods = ['GET'])
def rescrapescheduleagain():
    updated = update_yesterday_games()
    #updated = update_season()
    return updated, 200

if __name__ == '__main__':
    app.run(port=4000)