'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
		return queryInterface.createTable('EventFiles', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			// FK
			eventId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'Events',
					key: 'id',
				},
				onUpdate: 'cascade',
				onDelete: 'set null',
			},
			eventSessionId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'EventSessions',
					key: 'id',
				},
				onUpdate: 'cascade',
				onDelete: 'set null',
			},
			fileId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Files',
					key: 'id',
				},
				onUpdate: 'cascade',
				onDelete: 'set null',
			},

			// Standart
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
