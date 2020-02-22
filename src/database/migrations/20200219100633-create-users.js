'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Users', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			passwordHash: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			roleId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Roles',
					key: 'id',
				},
				onUpdate: 'cascade',
				onDelete: 'set null',
			},
			active: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
			schoolId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'Schools',
					key: 'id',
				},
				onUpdate: 'cascade',
				onDelete: 'set null',
			},
			fileVerificationId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'Files',
					key: 'id',
				},
				onUpdate: 'cascade',
				onDelete: 'set null',
			},
			reasonInactive: {
				type: Sequelize.STRING,
				allowNull: true,
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
		return queryInterface.dropTable('Users');
	},
};
