'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Projects',
			[
				{
					title: 'Cineuropa, the site for European cinema',
					goal: 'Provide texts about culture in Europe',
					description:
						'The online platform available in four languages and covering wide audience and film industry professionals. On Cineuropa, readers can find special reports, company databases, script analysis and much more. In addition, the authors provide texts about culture in Europe. The project is implemented by Belgium.',
					links: 'http://www.cineuropa.org/  ',
					ageRangeStart: 10,
					ageRangeEnd: 15,
					type: 'Online',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'The European Opera Digital Project',
					goal:
						'Provide live streams of a wide range of performances, subtitled in six languages',
					description:
						'The organizers are working on the online platform exploring the whole world of European opera. The site will provide live streams of a wide range of performances, subtitled in six languages. The new platform will use the interviews, access to ancient manuscripts and social media to refresh the art form of opera to the audience in the 21st century. The project is the result of collaboration between fifteen opera companies from twelve countries.',
					links:
						'http://www.creativeeuropeuk.eu/funded-projects/european-opera-digital-project2',
					ageRangeStart: 10,
					ageRangeEnd: 15,
					type: 'Online',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'PHONE HOME',
					goal: 'Engage immigrants into the creative process',
					description:
						'This project is the result of collaboration between three theatres from different European countries. What makes their performance innovative is the use of Internet communications. In other words, to reproduce real-life stories, it will be interlinked via video-conferencing. The performance is a reflection on the controversial international agenda of refugees and migration. Each partner theatre will engage immigrants into the creative process. The project is held by Greece, Germany, and the UK.',
					links: 'http://www.creativeeuropeuk.eu/funded-projects/phone-home',
					ageRangeStart: 10,
					ageRangeEnd: 15,
					type: 'Online',
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
