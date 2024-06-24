'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Articles', [{
      title: "First Node Articles",
      text: "Huge text which will be edited",
      creationDate: new Date(),
      tag1: "NodeJS",
      tag2: "React",
      tag3: "Express",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
