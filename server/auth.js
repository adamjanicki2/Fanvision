const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const socketManager = require("./server-socket");
const Scoreboard = require("./models/scoreboard");
const LockInStatus = require("./models/LockInStatus");
const CLIENT_ID = "911618425792-hk0acmfunco1f8qg441iih4pvm01cuae.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
const moment = require('moment');
require('moment-timezone');
// accepts a login token from the frontend, and verifies that it's legit
function verify(token) {
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
}

// gets user from DB, or makes a new account if it doesn't exist yet
function getOrCreateUser(user) {
  console.log(user);
  // the "sub" field means "subject", which is a unique identifier for each user
  return User.findOne({ googleid: user.sub }).then((existingUser) => {
    if (existingUser) return existingUser;

    const newUser = new User({
      name: user.name,
      googleid: user.sub,
      gold_dates: [],
      silver_dates: [],
      bronze_dates: [],
      picture: user.picture,
    });

    return newUser.save();
  });
}

function createNewScoreboardUser(user){
  let in_scoreboard;
  const userscoreboard = Scoreboard.find({user_id: user._id, name: user.name}).then((existing) => {
    in_scoreboard = existing.length !== 0;
    //console.log(in_scoreboard)
    if (!in_scoreboard){
      const newScore = new Scoreboard({
        name: user.name,
        googleid: user.googleid,
        user_id: user._id,
        current_score: 0,
        gold: 0,
        silver: 0,
        bronze: 0,
      });
      newScore.save();
    }
  })
  
}

function createNewStatusUser(user){
  let instatus;
  let today = Date();
  const today_str = moment(today).tz("America/New_York").format("YYYY-MM-DD");
  const statusboard = LockInStatus.find({googleid: user.googleid}).then((existing) => {
    //console.log(existing);
    instatus = existing.length !== 0
    if (!instatus){
      const newStatus = new LockInStatus({
        googleid: user.googleid,
        date: today_str,
        status: false,
      });
      newStatus.save();
    }else{
      if (existing[0].date !== today_str){
        LockInStatus.updateOne({googleid: existing[0].googleid}, {date: today_str, status: false}).then((updated) => {
          console.log(updated);
        });
        
      }
    }
  })
}



function login(req, res) {
  verify(req.body.token)
    .then((user) => getOrCreateUser(user))
    .then((user) => {
      // persist user in the session
      //console.log(user._id);
      //TODO: REMOVE THIS UPDATEONE SOON
      User.updateOne({googleid: user.sub}, {picture: user.picture}).then((updated_picture) => {
        console.log('updated picture url for '+user.name+' with link: '+user.picture);
      });
      createNewScoreboardUser(user);
      createNewStatusUser(user);
      req.session.user = user;
      res.send(user);
    })
    .catch((err) => {
      console.log(`Failed to log in: ${err}`);
      res.status(401).send({ err });
    });
}

function logout(req, res) {
  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req, res, next) {
  // simply populate "req.user" for convenience
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ err: "not logged in" });
  }

  next();
}

module.exports = {
  login,
  logout,
  populateCurrentUser,
  ensureLoggedIn,
};
