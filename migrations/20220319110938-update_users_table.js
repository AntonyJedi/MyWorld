'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Users', 'email', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.addColumn('Users', 'password', {
        type: Sequelize.STRING,
        allowNull: false
      })
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'email'),
      queryInterface.removeColumn('Users', 'password')
    ])
  }
};
