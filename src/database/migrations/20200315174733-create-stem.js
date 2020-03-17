'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Stems', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			//costum
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			link: {
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
