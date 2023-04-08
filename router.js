const express = require("express");
const models = require("./models");
const passport = require("passport");
const router = express.Router();
const setupPassport = require("./setupPassport.js");
const LocalStrategy = require("passport-local");
router.use((req, res, next)=>{
  res.locals.currentUser = req.user;
  next();
});
passport.use(new LocalStrategy(async function verify(username, password, done){
  let targetUser = username;
  let user;
  try{
    user = await models.user.findOne({
      where: {
        username: targetUser
      }
    });
    if(!user) return done(null, false, {message: "user name does not exist"});
  }catch(err){
    return done(err);
  }
  const result = await models.user.checkPassword(password, user.toJSON().password);
  console.log(user.toJSON().password);
  console.log(result);
  switch(result){
    case true:
        return done(null, user);
        break;
    case false:
      return done(null, false, {message:"invalid password"});
  }
}));
setupPassport();
router.get("/", (req, res, next)=>{
  res.render("login");
});
router.get("/logOut", (req, res, next)=>{
  console.log("Executing logout route ..."); 
  req.logout((err)=>{
    next(err); 
  }); 
  res.redirect("/login");
}); 
router.get("/create_account",(req, res, next)=>{
  res.render("signup"); 
})
router.post("/create_account", async (req, res, next)=>{
  try{
    const users_information = {username: req.body.user_name,  password:req.body.password, email:req.body.email}
    await models.user.create(users_information);
    res.redirect("/home"); 
  }catch(err){
    console.log("something wrong is with user input"); 
    console.error(err); 
  }
});
router.get("/home", ensureAuthenticated, async (req,res, next)=>{
  res.render("index", {user:req.user.username});
});
router.get("/history", ensureAuthenticated, async (req, res, next)=>{
  console.log(`printing history associated with user id of ${req.user.id}`)
  const allTodos = await models.todos.findAll({
    where: {
      userId:req.user.id
    }
  });
  const arr = allTodos.map((value)=>{
    return value.toJSON();
  });
  res.render("history", {username:req.user.username, allTodos:arr});
});
router.get("/profile", ensureAuthenticated, (req, res, next)=>{
  res.render("profile", {username: req.user.username});
});
router.post("/profile",ensureAuthenticated, async (req, res, next)=>{
 let name = req.body.username;
  try{
    const updateName = await models.user.update({username:name}, {
      where: {
        username: req.user.username
      }
    });
    req.user.username = name;
  }catch(err){
   next(err);  
  }
  console.log("printing username "); 
  console.log(req.user); 
  req.user.username = name; 

});

router.get("/login", (req, res, next)=>{
  res.render("login");
});
router.post("/login",  passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login"
}));
router.post("/addTodo", ensureAuthenticated, async (req, res, next)=>{
  const todo = req.body.todo;
  console.log("printing todo item...");
  console.log("printing currentUser");
  console.log(req.user);
  await models.todos.create({userId: req.user.id, todo: todo});
  console.log("written to database successfully");
});
router.post("/deleteTodo",ensureAuthenticated,  async(req, res,next)=>{
  console.log("printing todo to delete");
  const target = req.body.Dtodo;
  await models.todos.destroy({
    where: {
      todo: target,
      userId:req.user.id
    }
  });
  console.log("successfully deleted todo");
})
function ensureAuthenticated(req, res, next){
  if(req.user){
    next();
  }
  else{
    res.redirect("/login");
  }
}
module.exports=router;
