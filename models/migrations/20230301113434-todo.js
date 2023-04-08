'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable("todos", {
      userId: {
        type:DataTypes.INTEGER , 
        references:{
          key: "id", 
          model: "users"
        }
      }, 
      todo: {
        type: DataTypes.STRING
      }, 
      createdAt: {
        type: DataTypes.DATE
      }, 
      updatedAt: {
        type: DataTypes.DATE
      }
    })
    /**
     *tis 
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeTable("todos"); 
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
