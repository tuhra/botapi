'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profiles', {
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
      profile: {
        type: Sequelize.TEXT
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
    .then(() => queryInterface.addConstraint('profiles', {
      type: 'FOREIGN KEY',
      name: 'FK_project_id_profiles',
      fields: ['project_id'], 
      references: {
        table: 'projects',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }))
    .then(() => queryInterface.addConstraint('profiles', {
      type: 'FOREIGN KEY',
      name: 'FK_profiles_user_id_users',
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
    await queryInterface.dropTable('profiles');
  }
};