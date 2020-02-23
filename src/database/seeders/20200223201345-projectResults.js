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
