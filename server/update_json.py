from basketball_reference_web_scraper import client
import json
import pytz
import datetime

def save_schedule_as_json(fname, end_year):
    """
    Args: 
        fname: String, name of file to write to
        end_year: Int, year the season ends
    Returns:
        'success' if it fetched data and wrote to file
        None if no data was retrieved
    """
    try:
        sched = client.season_schedule(season_end_year=end_year)
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
    with open(fname, 'w') as f:
        json.dump(games, f)
    f.close()
    return 'success'

if __name__ == '__main__':
    sched = save_schedule_as_json("2021_NBA_Schedule.json", 2021)
    #print(sched)