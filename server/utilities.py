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
CURRENT_YEAR = 2021

CONVERSION = {
    1:1,
    2:2,
    3:3,
    4:4,
    5:5,
    6:6,
    7:7,
    8:8,
    9:9,
    10:10,
    11:11,
    0:12
}

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