'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   
   return queryInterface.createTable('Activities', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    description:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    description:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    projectId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Projects',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'set null',
    }, 

  });
  
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.dropTable('Activities');

  }
};
