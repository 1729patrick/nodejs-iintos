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
					projectId: 1,
					schoolId: 1,

					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					studentName: 'Antonio Pardo',
					projectId: 1,
					schoolId: 1,

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
					projectId: 2,
					schoolId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					studentName: 'Luiza Pardal',
					projectId: 2,
					schoolId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					userId: 8,
					projectId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					studentName: 'Jack Ma',
					projectId: 3,
					schoolId: 1,

					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					studentName: 'Elon Musk',
					projectId: 3,
					schoolId: 1,

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
