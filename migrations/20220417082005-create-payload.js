'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payloads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      block_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      payload_type: {
        type: Sequelize.STRING
      },
      body: {
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
    .then(() => queryInterface.addConstraint('payloads', {
      type: 'FOREIGN KEY',
      name: 'FK_block_id_blocks',
      fields: ['block_id'], 
      references: {
        table: 'blocks',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }))
    .then(() => queryInterface.addConstraint('payloads', {
      type: 'FOREIGN KEY',
      name: 'FK_payloads_user_id_users',
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
    await queryInterface.dropTable('payloads');
  }
};