'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Projects', [
			{
				title: 'Curricula analysis and comparison',
				description:
					'The project output aims to establish a dynamic comparison tool of the partners and associate partner countries curricula, to be generalized to the European countries.' +
					'For this purpose STEM subjects are chosen. STEM subjects are universally taught and are mostly independent from cultural regional culture, which makes them ideal to bridge European curricula.' +
					'The partners and associate partner will, in a first step, analyze their own curriculum according to the selected subjects, by following a specific method and by using different criteria. The result is a table by curriculum that describe the way to integrate transversal skills and global education objectives as well as ICT following these analysis. Then, the comparison between the whole curricula will be realized according to a particular framework.' +
					'As result, a comparative curricula matrix tool will be produced for the selected subjects and will establish the common points of the whole curricula, in term of subjects, transversal skills and global education objectives.' +
					'This tool will be produced according to the partners curricula. But, every teacher, from another country in Europe, will be able to use this tool according to his own curriculum.' +
					'This tool will be tested in the two pilot schools partners.' +
					'This tool will be the basis, for every teacher, to set up a lesson or a project, that do correspond to his own curriculum objectives, and additionally that do correspond with the curriculum objectives in STEM subjects of his European partner.' +
					'This will make every teacher also able to organize an international exchange project with another school, in his teaching subject (STEM).' +
					"The product will be this analysis and comparative curricula tool (STEM subjects) and its associate user's guide.",
				type: 'Output',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'CMS and TMS web-based platform and database implementation',
				description:
					'The project output is an interactive Multilanguage Internet open source platform associated to a Database Management System (DBMS) that will permit to store all the necessary resources for teachers, students, international coordinators and schools stakeholders to implement a project at national or international level and to make teachers able to create a lesson according to the global education objectives in the context of STEM subjects as well as curricula analysis and comparison framework.' +
					'This platform will have two distinctive features:' +
					'One – CMS (Content Management System)' +
					'It will contain the following items:' +
					'- Introduction and full description of the project' +
					'- Partners description' +
					'- National pages (in the languages of the partners and in English)' +
					'- Resources' +
					"This section will contain the project's description e-book document, the curricula analysis and comparison document, the two pilots schools e-books, the platform user guide, internationalization of schools documentation, STEM resources developed by the partners as well as Internet references to STEM resources provided by national and European funded projects to be listed (On line labs for example)." +
					'Each resource, stored in the database, will be founded by using filtering criteria (Subject, transversal skills, global education topic, age range of the students, language, country...)' +
					'- Newsletters' +
					'- Wiki' +
					'- Schools projects description' +
					'- Forum about internationalization of schools' +
					'- Conferences and workshops events and schedules' +
					'Each conference and workshop description, stored in the database, will be founded by using filtering criteria (Subject, transversal skills, global education topic, age range of the students, language, country...)' +
					'- Communication and dissemination strategies at national and international level' +
					'- Partners and associate partner national reports' +
					'- Contact section: this section will contain the partners and associate partner institutions names, contact persons names, addresses, cities, countries, phone numbers, e-mails, website of the partners and associate partner. A contact formulary will be also be online to permit to' +
					'every person to send his information, asks / suggestions / requests.' +
					'Two – TMS (Task management System)' +
					'This system managed by every coordinator, will contain the following items:' +
					'-coordinators contacts' +
					'- Schools information' +
					'- Exchanges channel with others coordinators' +
					'- Schools exchanges opportunities for teachers' +
					'- Tasks management (phone calls, e-mails, notes and meetings)' +
					'- Campaigns' +
					'- e-mailings' +
					'- Newsletters' +
					'- Workflows' +
					'- Documents',
				type: 'Output',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'Pilot schools activities e-books',
				description:
					'Based on the experience and analysis of a pilot run on the two partners Schools, all partners and associated partner will partake in the creation of the "Pilot schools activities ebook" which aims to be a testimonial of the implementation of International office in schools and use of the tools developed in the project.' +
					'This e-book will be a comprehensive support for every school aiming to implement an international office and develop national and international exchange programs.' +
					'It will be construct to function also as a powerful tool for dissemination.' +
					'The e-book will describe the various phases of the Pilot schools run and, in order to increase its versatility and multiple function, it will be structured in 6 engaging stand-alone modules orientated for schools headmasters and teachers:' +
					'- Process of selection of the international coordinator and allocation of resources;' +
					'- Process of selection of the students’ classes;' +
					'- Process of theme and activities selection in the scope of the results from O1;' +
					'- Process of virtual international exchange project;' +
					'- Process of real international exchange project;' +
					'- Analysis and conclusions of the process and obtained results.' +
					'During the process of data collection for the e-book video testimonials of the participants will be gathered for further dissemination and motivation tool.' +
					'The product will be permanently available on the project platform and partners online repositories.',
				type: 'Output',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: "User's guide for international office in school implementation",
				description:
					'Four main components' +
					'1. Catalogue of effective strategies (from each participant region) that have had successful school international offices. The strategies used in the pilot schools (O3) will be included here.' +
					'2. Guide on curricula analysis tool (O1).' +
					'3. Tutorial on the use of the project platform (O2).' +
					'4. Video/audio tutorials (number to be defined) on every aspect of the implementation and execution process of an international office by peer.' +
					'The guide will be published in multiple media and made available on the project platform and the tutorials on platforms such as youtube.' +
					'Since the project aim is the successful implementation of international offices in schools the guide will be only available in English. Nevertheless, selected related material collected during the guide construction, will be made available and kept in the original language as a safe keep for translation losses.',
				type: 'Output',
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
