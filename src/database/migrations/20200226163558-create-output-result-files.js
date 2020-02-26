'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('OutputResultFiles', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			outputResultId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'OutputResults',
					key: 'id',
				},
				onUpdate: 'cascade',
				onDelete: 'set null',
			},
			fileId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Files',
					key: 'id',
				},
				onUpdate: 'cascade',
				onDelete: 'set null',
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

	down: queryInterface => {
		return queryInterface.dropTable('ActivityFiles');
	},
};
