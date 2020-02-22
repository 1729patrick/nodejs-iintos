'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Activities',
			[
				{
					title: 'Create the project webpage',
					description: '- webpage with lisp\n-web, mobile and desktop',
					projectId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Create the project webpage',
					description: '- webpage with lisp\n-web, mobile and desktop',
					projectId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Create the project webpage',
					description: '- webpage with lisp\n-web, mobile and desktop',
					projectId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Create the project blog',
					description: '- webpage with lisp\n-web, mobile and desktop',
					projectId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Create the project blog',
					description: '- webpage with lisp\n-web, mobile and desktop',
					projectId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Create the project blog',
					description: '- webpage with lisp\n-web, mobile and desktop',
					projectId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Create the project documentation',
					description: '- webpage with lisp\n-web, mobile and desktop',
					projectId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Create the project documentation',
					description: '- webpage with lisp\n-web, mobile and desktop',
					projectId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Create the project documentation',
					description: '- webpage with lisp\n-web, mobile and desktop',
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
