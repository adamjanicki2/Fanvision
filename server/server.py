from update_schedule import update_yesterday_games
from update_schedule import update_season
from flask import Flask
app = Flask(__name__)

@app.route('/rescrapescheduleagain', methods = ['GET'])
def rescrapescheduleagain():
    #updated = update_yesterday_games()
    updated = update_season()
    return updated, 200

if __name__ == '__main__':
    app.run(port=4000)