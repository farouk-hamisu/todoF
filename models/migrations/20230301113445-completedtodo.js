'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable("completedTodos", {
      usersId: {
        type:DataTypes.INTEGER, 
        references: {
          model: "users", 
          key: "id"
        }
      }, 
      complete: {
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
