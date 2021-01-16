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
  new Schedule ({date:"2020-11-01", games:[]}).save().then(() => {console.log("saved to MongoDB")});
  res.send("hello");
  // let today = Date();
  // const today_str = moment(today).tz("America/New_York").format("YYYY-MM-DD");
  // //testing
  // console.log(Schedule.find({date: "2021-01-16" }).then((games) => {
  //   console.log(games);
  // }));
  // Schedule.find({date: today}).then((games) => {res.send(games)});
  });



// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
