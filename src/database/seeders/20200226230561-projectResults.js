'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Results', [
			{
				title: 'Result 1',
				description: 'Description 1 !!!',
				projectId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'Result 2',
				description: 'Description 2 !!!',
				projectId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'Result example',
				description: 'This is an exemple of an result',
				projectId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'Result example 23',
				description: 'This is an example of an result',
				projectId: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'Result example 23',
				description: 'This is an example of an result',
				projectId: 4,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'Result example 23',
				description: 'This is an example of an result',
				projectId: 5,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'Result example 23',
				description: 'This is an example of an result',
				projectId: 6,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'Result example 23',
				description: 'This is an example of an result',
				projectId: 7,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'Result example 23',
				description: 'This is an example of an result',
				projectId: 8,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'Result example 23',
				description: 'This is an example of an result',
				projectId: 9,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'Result example 23',
				description: 'This is an example of an result',
				projectId: 10,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'Result example 23',
				description: 'This is an example of an result',
				projectId: 11,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
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
