"use strict";'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('ActivityUsers', [
			{
				projectUserId: 1,
				activityId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				projectUserId: 2,
				activityId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				projectUserId: 3,
				activityId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				projectUserId: 4,
				activityId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				projectUserId: 5,
				activityId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				projectUserId: 6,
				activityId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				projectUserId: 7,
				activityId: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				projectUserId: 8,
				activityId: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				projectUserId: 9,
				activityId: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				projectUserId: 3,
				activityId: 4,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				projectUserId: 6,
				activityId: 5,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				projectUserId: 9,
				activityId: 6,
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
