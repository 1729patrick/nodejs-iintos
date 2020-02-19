'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
	up: queryInterface => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					name: 'Admin Zé',
					email: 'iintosdev@hotmail.com',
					passwordHash: bcrypt.hashSync('123456', 8),
					active: true,
					roleId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Coordinator Zé',
					email: 'iintosc@hotmail.com',
					passwordHash: bcrypt.hashSync('123456', 8),
					active: true,
					roleId: 2,
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
