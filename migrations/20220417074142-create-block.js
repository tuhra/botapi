'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      page_id: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
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
    .then(() => queryInterface.addConstraint('blocks', {
      type: 'FOREIGN KEY',
      name: 'FK_project_id_projects',
      fields: ['project_id'], 
      references: {
        table: 'projects',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }))
    .then(() => queryInterface.addConstraint('blocks', {
      type: 'FOREIGN KEY',
      name: 'FK_blocks_user_id_users',
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
    await queryInterface.dropTable('blocks');
  }
};