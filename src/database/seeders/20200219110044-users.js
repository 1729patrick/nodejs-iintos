'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
	up: queryInterface => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					name: 'Admin Gilberto',
					email: 'admin@iintos.com',
					passwordHash: bcrypt.hashSync('123456', 8),
					active: true,
					roleId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Coordinator Gervásio',
					email: 'coodinator@iintos.com',
					passwordHash: bcrypt.hashSync('123456', 8),
					active: true,
					roleId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Professor Zé',
					email: 'professor@iintos.com',
					passwordHash: bcrypt.hashSync('123456', 8),
					active: true,
					roleId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Professor Jabor',
					email: 'prof@iintos.com',
					passwordHash: bcrypt.hashSync('123456', 8),
					active: false,
					roleId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: queryInterface => {
		return queryInterface.bulkDelete('Users', null, {});
	},
};
