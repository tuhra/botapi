'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      page_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      is_used: {
        type: Sequelize.BOOLEAN
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
    .then(() => queryInterface.addConstraint('projects', {
      type: 'FOREIGN KEY',
      name: 'FK_page_id_pages',
      fields: ['page_id'], 
      references: {
        table: 'pages',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }))
    .then(() => queryInterface.addConstraint('projects', {
      type: 'FOREIGN KEY',
      name: 'FK_project_user_id_users',
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
    await queryInterface.dropTable('projects');
  }
};