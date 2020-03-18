'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Logs', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			//costum
			method: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			path: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			body: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			params: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			userId: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			//Standart
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
	},
};
