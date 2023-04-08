"use strict"; 
const models = require("./models"); 
const passport = require("passport"); 
module.exports = ()=>{
  passport.serializeUser((user, done)=>{
    process.nextTick(()=>{
      return done(null, {id:user.id,username: user.username} ); 
    })
  })
  passport.deserializeUser(async (user, done)=>{
    process.nextTick( ()=>{
      return done(null, user); 
    }) 
  })
}
