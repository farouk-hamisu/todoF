'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('/usr/local/lib/node_modules/sequelize');
const process = require('process');
const basename = path.basename(__filename);
require("dotenv").config(); 
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
console.log("printing process object to database connection"); 
console.log('printing db connection string from models'); 
console.log(process.env.DB_CONNECTION_STRING); 
console.log('printing use_env_variable'); 
console.log(config.use_env_variable);
console.log(process.env[config.use_env_variable]); 
if (process.env.DB_CONNECTION_STRING) {
  sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
