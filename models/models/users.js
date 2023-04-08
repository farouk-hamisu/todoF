"use strict"; 
const {Model} = require("/usr/local/lib/node_modules/sequelize"); 
const bcrypt = require("/usr/local/lib/node_modules/bcryptjs"); 
module.exports =(sequelize, DataTypes)=>{
  class User extends Model{
     static async checkPassword(guess, hash){
      try{
        let result = await bcrypt.compare(guess, hash); 
        return result ===true; 
      }catch(err){
        console.log("comparing hashing failed"); 
        console.log(err); 
      }
    }
    static associate(models){
      this.hasMany(models.todos); 
      this.hasMany(models.completedTodos); 
    }
  }
  User.init({
    id:{
      primaryKey:true, 
      allowNull:false, 
      autoIncrement: true, 
      type:DataTypes.INTEGER
    }, 
    username: {
      type: DataTypes.STRING, 
      unique:true, 
      allowNull:false, 
      validate: {
        isLowercase: true
      }
    }, 
    password: {
      type:DataTypes.STRING, 
      allowNull:false, 
      unique: true, 
    }, 
    email:{
      type: DataTypes.STRING, 
      allowNull:false 
    }
  }, {sequelize, modelName: "user"}); 
  User.addHook("beforeCreate", async (user, options)=>{
    /* if user changed password or not */ 
    if(!user.changed("password")){
      return; 
    }
    const SALT = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(user.password, SALT); 
    const hashedEmail = await bcrypt.hash(user.email, SALT); 
    user.password = hashedPassword; 
    user.email = hashedEmail; 
    return; 
  }); 
  return User; 
}
