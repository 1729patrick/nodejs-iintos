'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('News', 'resultId', {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'Results',
				key: 'id',
			},
			onUpdate: 'cascade',
			onDelete: 'set null',
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
