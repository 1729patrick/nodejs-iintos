'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('SchoolProjects', [
			{
				schoolId: 1,
				projectId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				schoolId: 2,
				projectId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				schoolId: 1,
				projectId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				schoolId: 3,
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
