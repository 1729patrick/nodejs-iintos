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
					startDate: new Date(),
					endDate: new Date(
						'Mon mar 24 2020 17:55:25 GMT+0000 (Western European Standard Time)'
					),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Create the project webpage',
					description: '- webpage with lisp\n-web, mobile and desktop',
					projectId: 2,
					startDate: new Date(),
					endDate: new Date(
						'Mon mar 24 2020 17:55:25 GMT+0000 (Western European Standard Time)'
					),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Create the project webpage',
					description: '- webpage with lisp\n-web, mobile and desktop',
					projectId: 3,
					startDate: new Date(),
					endDate: new Date(
						'Mon mar 24 2020 17:55:25 GMT+0000 (Western European Standard Time)'
					),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Create the project blog',
					description: '- webpage with lisp\n-web, mobile and desktop',
					projectId: 1,
					startDate: new Date(),
					endDate: new Date(
						'Mon mar 24 2020 17:55:25 GMT+0000 (Western European Standard Time)'
					),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Create the project blog',
					description: '- webpage with lisp\n-web, mobile and desktop',
					projectId: 2,
					startDate: new Date(),
					endDate: new Date(
						'Mon mar 24 2020 17:55:25 GMT+0000 (Western European Standard Time)'
					),
					startDate: new Date(),
					endDate: new Date(
						'Mon mar 24 2020 17:55:25 GMT+0000 (Western European Standard Time)'
					),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Create the project blog',
					description: '- webpage with lisp\n-web, mobile and desktop',
					projectId: 3,
					startDate: new Date(),
					endDate: new Date(
						'Mon mar 24 2020 17:55:25 GMT+0000 (Western European Standard Time)'
					),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Create the project documentation',
					description: '- webpage with lisp\n-web, mobile and desktop',
					projectId: 1,
					startDate: new Date(),
					endDate: new Date(
						'Mon mar 24 2020 17:55:25 GMT+0000 (Western European Standard Time)'
					),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Create the project documentation',
					description: '- webpage with lisp\n-web, mobile and desktop',
					projectId: 2,
					startDate: new Date(),
					endDate: new Date(
						'Mon mar 24 2020 17:55:25 GMT+0000 (Western European Standard Time)'
					),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Create the project documentation',
					description: '- webpage with lisp\n-web, mobile and desktop',
					projectId: 3,
					startDate: new Date(),
					endDate: new Date(
						'Mon mar 24 2020 17:55:25 GMT+0000 (Western European Standard Time)'
					),
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
