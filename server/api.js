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
const Schedule = require("./models/schedule");
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
  if (req.user){
    //We only need to fetch yesterday's results if the user is logged in
    //If so, find yesterday's results in the database
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterday_str = moment(yesterday).tz("America/New_York").format("YYYY-MM-DD");
    Schedule.find({}).then((games) => {
      console.log(games);
      res.send(games);
    });
  }
});

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
