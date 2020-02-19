'use strict';

module.exports = {
	up: queryInterface => {
		return queryInterface.bulkInsert(
			'Roles',
			[
				{
					name: 'Admin',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Coordinator',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Professor',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Guest-Professor',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'IINTOS-Admin',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'IINTOS-Partner',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: queryInterface => {
		return queryInterface.bulkDelete('Roles', null, {});
	},
};
