'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('Schools', 'contactEmail', {
			type: Sequelize.STRING,
			allowNull: true,
		});
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
	},
};
