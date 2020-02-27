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
					name: 'Coordinator Gertudres',
					email: 'coordinator@iintos.com',
					passwordHash: bcrypt.hashSync('123456', 8),
					active: true,
					schoolId: 1,
					roleId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Professor Zé',
					email: 'professor@iintos.com',
					passwordHash: bcrypt.hashSync('123456', 8),
					active: true,
					schoolId: 1,
					roleId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Professor Jabor',
					email: 'prof@iintos.com',
					passwordHash: bcrypt.hashSync('123456', 8),
					active: false,
					schoolId: 1,
					roleId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Coordinator Gervásio',
					email: 'gervasio@iintos.com',
					passwordHash: bcrypt.hashSync('123456', 8),
					active: true,
					schoolId: 2,
					roleId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Professor Anturio',
					email: 'anturio@iintos.com',
					passwordHash: bcrypt.hashSync('123456', 8),
					active: true,
					schoolId: 2,
					roleId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Professor Anaclete',
					email: 'anaclete@iintos.com',
					passwordHash: bcrypt.hashSync('123456', 8),
					active: false,
					schoolId: 2,
					roleId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Coordinator Filipe',
					email: 'filipe@iintos.com',
					passwordHash: bcrypt.hashSync('123456', 8),
					active: true,
					schoolId: 3,
					roleId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'IINTOS-Admin Jarvis',
					email: 'Jarvis@iintos.com',
					passwordHash: bcrypt.hashSync('123456', 8),
					active: true,
					roleId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'IINTOS-Partner Tony',
					email: 'jarvis@iintos.com',
					passwordHash: bcrypt.hashSync('123456', 8),
					active: true,
					roleId: 5,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Professor Liborio',
					email: 'liborio@iintos.com',
					passwordHash: bcrypt.hashSync('123456', 8),
					active: true,
					schoolId: 3,
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
