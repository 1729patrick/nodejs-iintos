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
					ageRangeStart: 15,
					ageRangeEnd: 17,
					type: 'Online',
					startDate: new Date(),
					endDate: new Date(
						'Mon Mar 24 2020 17:55:25 GMT+0000 (Western European Standard Time)'
					),
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
					ageRangeStart: 11,
					ageRangeEnd: 12,
					type: 'Online',
					startDate: new Date(),
					endDate: new Date(
						'Mon Mar 27 2020 17:55:25 GMT+0000 (Western European Standard Time)'
					),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'PHONE HOME',
					goal: 'Engage immigrants into the creative process',
					description:
						'This project is the result of collaboration between three theatres from different European countries. What makes their performance innovative is the use of Internet communications. In other words, to reproduce real-life stories, it will be interlinked via video-conferencing. The performance is a reflection on the controversial international agenda of refugees and migration. Each partner theatre will engage immigrants into the creative process. The project is held by Greece, Germany, and the UK.',
					links: 'http://www.creativeeuropeuk.eu/funded-projects/phone-home',
					ageRangeStart: 18,
					ageRangeEnd: 17,
					type: 'Online',
					startDate: new Date(),
					endDate: new Date(
						'Mon Feb 24 2020 17:55:25 GMT+0000 (Western European Standard Time)'
					),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Live and Learn - Audiovisual Stories of Adult Education',
					goal: 'Our project is inspired by two observations, ...',
					description:
						'This project is the result of collaboration between three theatres from different European countries. What makes their performance innovative is the use of Internet communications. In other words, to reproduce real-life stories, it will be interlinked via video-conferencing. The performance is a reflection on the controversial international agenda of refugees and migration. Each partner theatre will engage immigrants into the creative process. The project is held by Greece, Germany, and the UK.',
					links:
						'https://ec.europa.eu/programmes/erasmus-plus/projects/eplus-project-details/#project/2014-1-FI01-KA204-000843',
					ageRangeStart: 10,
					ageRangeEnd: 11,
					type: 'Online',
					startDate: new Date(),
					endDate: new Date(
						'Mon Apr 10 2020 17:55:25 GMT+0000 (Western European Standard Time)'
					),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title:
						'SME and Higher Education Institutes in Innovation Partnerships',
					goal:
						'Enterprise, industry and SMEs (incl. entrepreneurship), Quality and ...',
					description:
						'SME and Higher Education Institutes in Innovation Partnerships (SHIP) will strengthen the knowledge triangle, building sustainable collaborative relationships between universities, SMEs and innova...',
					links:
						'https://ec.europa.eu/programmes/erasmus-plus/projects/eplus-project-details/#project/554187-EPP-1-2014-1-IE-EPPKA2-KA',
					ageRangeStart: 10,
					ageRangeEnd: 18,
					type: 'Online',
					startDate: new Date(),
					endDate: new Date(
						'Mon Mar 14 2020 17:55:25 GMT+0000 (Western European Standard Time)'
					),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Valorize High Skilled Migrants',
					goal: 'Overcoming skills mismatches ...',
					description:
						'TARGET GROUP, AND NEEDS TO BE ADDRESSED The activity of the project is addresed to a specific target: • Adult migrants with medium-high professional competencies that barely can part...',
					links:
						'https://ec.europa.eu/programmes/erasmus-plus/projects/eplus-project-details/#project/2014-1-IT02-KA204-003515',
					ageRangeStart: 9,
					ageRangeEnd: 11,
					type: 'Online',
					startDate: new Date(),
					endDate: new Date(
						'Mon Jun 7 2020 17:55:25 GMT+0000 (Western European Standard Time)'
					),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title:
						'Connecting and improving peer intervention in nightlife settings on EU level',
					goal: 'Health and wellbeing, Youth (Participation, Youth Work ...',
					description:
						'Peer workers are an important part of youth work in nightlife prevention for young people, because they can approach their peers more easily than adult experts. Beside that they are often partygoe...',
					links:
						'https://ec.europa.eu/programmes/erasmus-plus/projects/eplus-project-details/#project/2014-2-SI02-KA205-000818',
					ageRangeStart: 10,
					ageRangeEnd: 15,
					type: 'Online',
					startDate: new Date(),
					endDate: new Date(
						'Mon Mar 4 2020 17:55:25 GMT+0000 (Western European Standard Time)'
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
