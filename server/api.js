/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const moment = require('moment');
require('moment-timezone');
const cron = require('node-cron');
const {PythonShell} =require('python-shell');
// WHERE WE IMPORT OUR SCHEMAS:
const User = require("./models/user");
const Schedule = require("./models/seasonSchedule");
const Prediction = require("./models/predictions");
const Scoreboard = require("./models/scoreboard");
const Time = require("./models/Time");
const LockInStatus = require("./models/LockInStatus");
const Podium = require("./models/Podium");
// import authentication library
const auth = require("./auth");
const PostedScore = require("./models/postedscore");
// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.get("/get_user", (req, res) => {
  User.findById(req.query._id_).then((user) => {
    res.send(user);
  });
})
// |------------------------------|
// | write your API methods below!|
// |------------------------------|


router.get("/5KdnT6mfJ56YhGVcHeXDW2Kls5be4D", (req, res)=>{ 
  let options = { 
      mode: 'text', 
      scriptPath: 'server/',
      pythonOptions: ['-u'],
  }; 
  PythonShell.run('update.py', options, function (err, result){ 
        if (err) throw err; 
        console.log({update_py: result.toString()});
        res.send({update_py: result.toString()}); 
  }); 
});

router.get("/kYh5LipxVj6rMs7B4rzBuodK01bWNH", (req, res) => {
  PostedScore.findOne().then((posted) => {
    const d = new Date();
    const full_today = d.toISOString().split('.')[0].split('T').join(' ');
    const today_string = d.toISOString().split('T')[0]
    let has_updated = (posted.scores_last_time === true) && (today_string === posted.date.split(' ')[0]);
    if (has_updated){
      console.log({msg: 'Already updated scores today! '+full_today+' UTC)'});
      res.send({msg: 'Already updated scores today! ('+full_today+' UTC)'});
    }else{
        let options = { 
          mode: 'text', 
          scriptPath: 'server/',
          pythonOptions: ['-u'],
        }; 
        PythonShell.run('update_scores.py', options, function (err, result){ 
            if (err) throw err; 
            console.log({UPDATE_SCORES: result.toString()+' ('+full_today+' UTC)'});
            res.send({UPDATE_SCORES: result.toString()+' ('+full_today+' UTC)'}); 
        }); 
    }
  })
  

});



router.get("/yesterdayresults", (req, res) => {
  if (true){
    //We only need to fetch yesterday's results if the user is logged in
    //If so, find yesterday's results in the database
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterday_str = moment(yesterday).tz("America/New_York").format("YYYY-MM-DD");
    Schedule.find({date: yesterday_str}).then((games) => {
      //console.log(games);
      res.send(games);
    });
  }
});

router.get("/todaygames",(req,res) => {
  // access games scheduled for the current date
  let today = Date();
  const today_str = moment(today).tz("America/New_York").format("YYYY-MM-DD");
  Schedule.find({date: today_str}).then((games) => {res.send(games)});
});

router.post("/updatescoreboard", (req, res) => {
  //structure of args:
  //req.user: the info on the user whose score we're updating
  //req.points: amount of points to ADD to current_score
  Scoreboard.updateOne({user_id: req.user._id, name: req.user.name, googleid: req.user.googleid}, {current_score: req.user.current_score + req.points, gold: req.user.gold_dates.length, silver: req.user.silver_dates.length, bronze: req.user.bronze_dates.length}).then((scores) => {
    console.log(scores);
  })
});

router.get("/getscoreboard", (req, res) => {
  Scoreboard.find({}).sort({current_score: -1}).then((scores) => {
    //console.log(scores);
    res.send(scores);
  });
});

router.get("/lockinstatus", (req, res) => {
  LockInStatus.find({googleid: req.user.googleid}).then((status) => {
    res.send(status);
  });
});

//USE THIS:
router.post("/changelockinstatus", (req, res) => {
  LockInStatus.updateOne({googleid: req.user.googleid}, { status: req.body.status}).then((status) => {
    console.log(status);
  });
});


//IGNORE THIS:
// router.post("/setlockinstatus", (req, res) => {
//   LockInStatus.find({googleid: req.body.googleid}).then((status) => {
//     if (status.length > 0){
//       let today = Date();
//       const today_str = moment(today).tz("America/New_York").format("YYYY-MM-DD");
//       if (status[0].date !== today_str){
//         LockInStatus.updateOne({googleid: status[0].googleid}, {date: today_str, status: false});
//         console.log({msg: 'updated lockin status for todays date'});
//       }
//     }
//   });
// });
router.post("/setpredictions", (req, res) => {
  //How the args to this post should be structed:
  // req.user: contains the JS object representing the logged in user
  // req.predictions: array of the  JS objects representing the user's predictions for the day
  //Examples:
  // req.predictions = [
  //     {
  //       home_team: ATL,
  //       away_team: BKN,
  //       predicted_winner: ATL,
  //       predicted_margin: 19,
  
  //     },
  //     {
  //       home_team: BOS,
  //       away_team: WAS,
  //       predicted_winner: BOS,
  //       predicted_margin: 17,
  //     }
  //   ]
  let today = Date(); //this line is working
  const today_str = moment(today).tz("America/New_York").format("YYYY-MM-DD");
  const newPredictions = new Prediction({
    date: today_str, 
    user_id: req.user._id,
    user_name: req.user.name,
    googleid: req.user.googleid,
    todays_predictions: req.body.predictions,
  });
  newPredictions.save().then((saved) => res.send(saved));

});

router.get('/gettodaypredictions', (req, res) => {
  //Args: req.user, user to get predictions for date
  //      req.date, date to search for
  let today = Date(); //this line is working
  const today_str = moment(today).tz("America/New_York").format("YYYY-MM-DD");
  Prediction.find({date: today_str, user_id: req.user._id}).then((predictions) => {
    res.send(predictions);
  });

});
router.get('/getyesterdaypredictions', (req, res) => {
  //Args: req.user, user to get predictions for date
  //      req.date, date to search for
  const today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterday_str = moment(yesterday).tz("America/New_York").format("YYYY-MM-DD");
  Prediction.find({date: yesterday_str, user_id: req.user._id}).then((predictions) => {
    res.send(predictions);
  });

});

router.post("/deletesavedprediction", (req, res) => {
  
  let today = Date(); //this line is working
  const today_str = moment(today).tz("America/New_York").format("YYYY-MM-DD");
  Prediction.deleteOne({date: today_str, user_id: req.user._id}).then((predictions) => {
    console.log("Old Saved Prediction Deleted")
  });

});

router.get('/current_time', (req, res) => {
  let today = Date(); //this line is working
  const today_str = moment(today).tz("America/New_York").format("YYYY-MM-DD HH:mm");
  res.send({time: today_str});
});

router.get('/get_earliest_game', (req, res) => {
  let today = Date(); //this line is working
  const today_str = moment(today).tz("America/New_York").format("YYYY-MM-DD");
  Schedule.findOne({date: today_str}).then((today_games) => {
    if (today_games){
      let sorted = today_games.games.sort((a, b) => 
      (parseInt(a.start_time.split(' ')[1].split(':')[0]) + parseInt(a.start_time.split(' ')[1].split(':')[1])/60 > parseInt(b.start_time.split(' ')[1].split(':')[0]) + parseInt(b.start_time.split(' ')[1].split(':')[1])/60 )? 1 : -1
      );
      res.send({time: sorted[0].start_time});
    }else{
      res.send({time: 'No games today'})
    }
  });
});

router.get('/getuserscore', (req, res) => {
  Scoreboard.findOne({googleid: req.user.googleid}).then((scores)=>res.send({current_score: scores.current_score,last_day_score: scores.last_day_score}));
})


router.get('/getpodium', (req, res) => {
  Podium.findOne().then((grogu) => {
    res.send(grogu);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
