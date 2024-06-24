'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Articles', [{
      title: "Second Node Articles",
      text: "Second text blah blah",
      creationDate: new Date(),
      tag1: "ORM",
      tag2: "React",
      tag3: "Express",
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        title: "Third Node Articles",
        text: "Third text blah blah",
        creationDate: new Date(),
        tag1: "Sequelize-Cli",
        tag2: "React",
        tag3: "Express",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "4 Node Articles",
        text: "4 text blah blah",
        creationDate: new Date(),
        tag1: "Sequelize-Cli",
        tag2: "React",
        tag3: "Express",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "5 Node Articles",
        text: "5 text blah blah",
        creationDate: new Date(),
        tag1: "Sequelize-Cli",
        tag2: "React",
        tag3: "Express",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
