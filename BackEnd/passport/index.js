const passport = require('passport');
const local = require('./localStrategy'); // 로컬서버로 로그인할때
const kakao = require('./kakaoStrategy'); // 카카오서버로 로그인할때
const User = require('../models/logins');

module.exports = () => {
   passport.serializeUser((user, done) => {
      
      done(null, user.id);

   });

   passport.deserializeUser((id, done) => {

      User.findOne({ where: { id } })
         .then(user => done(null, user))
         .catch(err => done(err));
   });

   local();
   kakao();
};