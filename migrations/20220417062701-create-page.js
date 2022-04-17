'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      fb_page_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fb_verify_token: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fb_app_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fb_app_secret: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      fb_access_token: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => queryInterface.addConstraint('pages', {
      type: 'FOREIGN KEY',
      name: 'FK_user_id_users',
      fields: ['user_id'], 
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }))
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pages');
  }
};