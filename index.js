const express = require("express"); 
const models = require("./models"); 
const path = require("path"); 
const body_parser = require("body-parser"); 
const router = require("./router.js"); 
const cookieParser = require("cookie-parser"); 
const session = require("express-session"); 
const passport = require("passport"); 
require("dotenv").config(); 
const app = express(); 
const development = "development"; 
const production = "production"; 
app.set("port", process.env.PORT || 3000); 
app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "pug"); 
app.set("env", development); 
app.use(express.static(path.join(__dirname, "public"))); 
app.use(body_parser.urlencoded({extended:true})); 
app.use(cookieParser()); 
app.use(session({secret:"@!#$#%#%#%#%#%#%#%#%#%#%#%#",  resave: true, saveUninitialized:true})); 
app.use(passport.authenticate("session")); 
/* sending icons */ 
app.use(express.static(path.join(__dirname,  "public", "icons", "icons"))); 
app.use(router); 
if(app.get("env") ===development){
  /* print verbose error messages and stack traces */ 
  app.use((err, req, res, next)=>{
    console.error(err); 
    res.send(err); 
  }); 
}
else if(app.get("env")===production){
  app.use((err, req, res, next)=>{
    res.status(500).send("server internal error"); 
  })
}
/* 404 page --- client wind up here */
app.use((err,req, res, next)=>{
  res.status(404).send(err); 
  console.error(err); 
  next();  
}); 
app.listen(app.get("port"), ()=>{
  console.log(`server started at ${app.get("port")}`); 
}); 

