'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true // Menjamin bahwa username unik
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false // Pastikan password selalu ada
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'user' // 'user' atau 'admin'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
