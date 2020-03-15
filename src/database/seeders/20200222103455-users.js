'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
	up: queryInterface => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					name: 'Admin Gilberto',
					email: 'iintosdev@gmail.com',
					passwordHash: bcrypt.hashSync('123456', 8),
					active: true,
					isPrivacy: false,
					roleId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Admin Gervasio',
					email: 'iceptalves@gmail.com',
					passwordHash: bcrypt.hashSync('123456', 8),
					active: false,
					isPrivacy: false,
					roleId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Admin Gervasio',
					email: 'daniel_alves_1@gmail.com',
					passwordHash: bcrypt.hashSync('123456', 8),
					active: true,
					roleId: 1,
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
