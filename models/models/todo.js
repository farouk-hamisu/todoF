"use strict"; 
const {Model} = require("/usr/local/lib/node_modules/sequelize"); 
module.exports = (sequelize, DataTypes)=>{
  class Todo extends Model{
    static associate(models){
      this.belongsTo(models.user); 
    }
  }
  Todo.init({
    id:{
      type:DataTypes.INTEGER, 
      allowNull:false, 
      primaryKey:true,
      autoIncrement:true
    }, 
    todo: {
      type: DataTypes.STRING
    }
  }, {sequelize, modelName: "todos"}); 
  return Todo; }
