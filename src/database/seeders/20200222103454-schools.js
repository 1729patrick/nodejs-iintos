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
					name: 'British School',
					phone: '+351 94595186',
					country: 'Ireland',
					city: 'Dublin',
					postalCode: '2121-578',
					active: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Astoria International School',
					phone: '+351 95665261',
					country: 'Italy',
					city: 'Rome',
					postalCode: '9628-584',
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
