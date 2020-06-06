'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.changeColumn('EventSessions', 'description', {
			type: Sequelize.STRING(50000),
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
