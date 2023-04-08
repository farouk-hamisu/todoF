'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable("users", {
      id: {
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
          isAlpha: true, 
          isLowercase: true
        }
      }, 
      password: {
        type:DataTypes.STRING, 
        allowNull:false, 
        unique: true, 
        validate: {
          isAlphanumeric: true
        }
      }, 
      createdAt: {
        type: DataTypes.DATE, 
        allowNull:true, 
        value: new Date()
      }, 
      updatedAt: {
        type: DataTypes.DATE, 
        allowNull:true, 
        value: new Date() 
      }
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
