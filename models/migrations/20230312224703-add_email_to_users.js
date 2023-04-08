"use strict"; 

module.exports = {
  async up(queryInterface, DataTypes){
    await queryInterface.addColumn("users", "email", {
      type: DataTypes.STRING, 
      allowNull:false, 
      validate: {
        isEmail:true
      }
    }); 
  }, 
  async down(queryInterfae, DataTypes){
    await queryInterface.removeColumn("users", "email"); 
  }
}
