'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("todos", "id", {
      type: Sequelize.INTEGER, 
      autoIncrement:true, 
      allowNull:false, 
      primaryKey:true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("todos", "id"); 
  }
};
