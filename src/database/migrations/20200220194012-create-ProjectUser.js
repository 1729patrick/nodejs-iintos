'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('ProjectUsers', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
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
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
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
		return queryInterface.dropTable('ProjectUsers');
	},
};
