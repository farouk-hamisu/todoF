"use stricts"; 
const {Model} = require("/usr/local/lib/node_modules/sequelize"); 
module.exports=(sequelize, DataTypes)=>{
  class CompletedTodo extends Model{
   static  associate(models){
     this.belongsTo(models.user); 
   }
  }
  CompletedTodo.init({
    complete: {
      type: DataTypes.STRING
    }
  }, {sequelize, modelName:"completedTodos"}); 
  return CompletedTodo; 
}
