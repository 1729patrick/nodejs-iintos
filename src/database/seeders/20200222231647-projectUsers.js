'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'ProjectUsers',
			[
				{
					userId: 3,
					projectId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					studentName: 'Patrick Battisti',
					studentAge: 21,
					projectId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					studentName: 'Antonio Pardo',
					studentAge: 37,
					projectId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					userId: 3,
					projectId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					studentName: 'Fernanda Creona',
					studentAge: 17,
					projectId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					studentName: 'Luiza Pardal',
					studentAge: 31,
					projectId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					userId: 3,
					projectId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					studentName: 'Jack Ma',
					studentAge: 55,
					projectId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					studentName: 'Elon Musk',
					studentAge: 38,
					projectId: 3,
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
