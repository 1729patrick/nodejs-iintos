'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Schools', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			phone: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			country: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			active: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
			city: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			cep: {
				type: Sequelize.STRING,
				allowNull: false,
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
		return queryInterface.dropTable('Schools');
	},
};
