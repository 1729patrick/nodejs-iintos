"use strict";'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
		return queryInterface.createTable('ActivityUsers', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			activityId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Activities',
					key: 'id',
				},
				onUpdate: 'cascade',
				onDelete: 'set null',
			},
			projectUserId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'ProjectUsers',
					key: 'id',
				},
				onUpdate: 'cascade',
				onDelete: 'set null',
			},
			studentName: {
				type: Sequelize.STRING,
			},
			studentAge: {
				type: Sequelize.INTEGER,
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
		return queryInterface.dropTable('ActivityUsers');
	},
};
