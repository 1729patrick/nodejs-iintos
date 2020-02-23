'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Schools',
			[
				{
					name: 'IPS - Institute polytechnic of Setúbal',
					phone: '+351 91118313',
					country: 'Portugal',
					city: 'Setúbal',
					postalCode: '2910-248',
					active: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Palacký University Olomouc',
					phone: '+351 94595186',
					country: 'Czechia',
					city: 'Olomouc',
					postalCode: '0000-000',
					active: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Group of Schools José Saramago',
					phone: '+351 95665261',
					country: 'Portugal',
					city: 'Palmela',
					postalCode: '0000-000',
					active: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Istuzione Superiore "G.Vallauri"',
					phone: '+351 95665261',
					country: 'Italy',
					city: 'Province of Morena',
					postalCode: '0000-000',
					active: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
	},
};
