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

// WHERE WE IMPORT OUR SCHEMAS:
const User = require("./models/user");
const Schedule = require("./models/seasonSchedule");
const Prediction = require("./models/prediction");
const Scoreboard = require("./models/scoreboard");

// import authentication library
const auth = require("./auth");

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

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.get("/yesterdayresults", (req, res) => {
  if (true){
    //We only need to fetch yesterday's results if the user is logged in
    //If so, find yesterday's results in the database
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterday_str = moment(yesterday).tz("America/New_York").format("YYYY-MM-DD");
    Schedule.find({date: yesterday_str}).then((games) => {
      console.log(games);
      res.send(games);
    });
  }
});

// const DATES_LIST = ['2020-12-22', '2020-12-23', '2020-12-25', '2020-12-26', '2020-12-27', '2020-12-28', '2020-12-29', '2020-12-30', '2020-12-31', '2021-01-01', '2021-01-02', '2021-01-03', '2021-01-04', '2021-01-05', '2021-01-06', '2021-01-07', '2021-01-08', '2021-01-09', '2021-01-10', '2021-01-11', '2021-01-12', '2021-01-13', '2021-01-14', '2021-01-15', '2021-01-16', '2021-01-17', '2021-01-18', '2021-01-19', '2021-01-20', '2021-01-21', '2021-01-22', '2021-01-23', '2021-01-24', '2021-01-25', '2021-01-26', '2021-01-27', '2021-01-28', '2021-01-29', '2021-01-30', '2021-01-31', '2021-02-01', '2021-02-02', '2021-02-03', '2021-02-04', '2021-02-05', '2021-02-06', '2021-02-07', '2021-02-08', '2021-02-09', '2021-02-10', '2021-02-11', '2021-02-12', '2021-02-13', '2021-02-14', '2021-02-15', '2021-02-16', '2021-02-17', '2021-02-18', '2021-02-19', '2021-02-20', '2021-02-21', '2021-02-22', '2021-02-23', '2021-02-24', '2021-02-25', '2021-02-26', '2021-02-27', '2021-02-28', '2021-03-01', '2021-03-02', '2021-03-03', '2021-03-04'];

// router.get('/postgarbage', (req, res) => {
//   for (let i = 0; i<DATES_LIST.length; i++){
//     let cur_date = DATES_LIST[i]
//     const newEntry = new Schedule({
//       date: cur_date,
//       games: ['test','123'],
//     });
//     newEntry.save().then((schedule => console.log(schedule)));
//   }
//   res.send('Done')
// });

router.get("/todaygames",(req,res) => {
  // access games scheduled for the current date
  let today = Date();
  const today_str = moment(today).tz("America/New_York").format("YYYY-MM-DD");
  Schedule.find({date: today_str}).then((games) => {res.send(games)});
});

router.post("/updatescoreboard", auth.ensureLoggedIn, (req, res) => {
  //structure of args:
  //req.user: the info on the user whose score we're updating
  //req.points: amount of points to ADD to current_score
  Scoreboard.updateOne({user_id: req.user._id, name: req.user.name, googleid: req.user.googleid}, {current_score: req.user.current_score + req.points}).then((scores) => {
    console.log(scores);
  })
});

router.get("/getscoreboard", (req, res) => {
  Scoreboard.find({}).sort({current_score: 1}).then((scores) => {
    //console.log(scores);
    res.send(scores);
  });
});

router.post("/setpredictions", auth.ensureLoggedIn, (req, res) => {
  //How the args to this post should be structed:
  // req.user: contains the JS object representing the logged in user
  // req.predictions: array of the  JS objects representing the user's predictions for the day
  //Examples:
  //req.predictions = [
    //   {
    //     home_team: ATL,
    //     away_team: BKN,
    //     predicted_winner: ATL,
    //     predicted_margin: 19,
  
    //   },
    //   {
    //     home_team: BOS,
    //     away_team: WAS,
    //     predicted_winner: BOS,
    //     predicted_margin: 17,
    //   }
    // ]
  let today = Date(); //this line is working
  const today_str = moment(today).tz("America/New_York").format("YYYY-MM-DD");
  const newPredictions = new Prediction({
    date: today_str, 
    user_id: req.user._id,
    user_name: req.user.name,
    todays_predictions: req.predictions,
  });
  newPredictions.save();
  console.log("Submitted "+req.user._id+"'s predictions for "+today_str);
});

router.get('/getprediction', auth.ensureLoggedIn, (req, res) => {
  //Args: req.user, user to get predictions for date
  //      req.date, date to search for
  Prediction.find({date: req.date, user_id: req.user._id, user_name: req.user.name}).then((predictions) => {
    res.send(predictions);
  });

});






// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
