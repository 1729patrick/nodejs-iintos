'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
		return queryInterface.createTable('Projects', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			goal: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING(50000),
				allowNull: false,
			},
			links: {
				type: Sequelize.STRING,
			},
			ageRangeStart: {
				type: Sequelize.INTEGER,
			},	
			ageRangeEnd: {
				type: Sequelize.INTEGER,
			},
			type: {
				type: Sequelize.STRING,
				defaultValue: 'Online',
				allowNull: false,
			},
			startDate: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW
			},
			endDate: {
				type: Sequelize.DATE,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
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
		return queryInterface.dropTable('Projects');
	},
};
