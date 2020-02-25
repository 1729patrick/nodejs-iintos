'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('ResultFiles', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			resultId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Results',
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
		return queryInterface.dropTable('ResultFiles');
	},
};
