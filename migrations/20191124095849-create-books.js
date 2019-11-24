'use strict'
import 'babel-polyfill'
import constants from '../config/constants'
const tableName = 'books'
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true
      },
      level: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      header_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      header_url_locked: {
        type: DataTypes.STRING,
        allowNull: true
      },
      price: {
        type: DataTypes.STRING,
        allowNull: true
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      background_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    })
    // await queryInterface.addIndex('users', ['username'])
    // await queryInterface.addIndex('users', ['email'])
    // await queryInterface.addIndex('users', ['user_type'])
  },

  down: (queryInterface, DataTypes) => queryInterface.dropTable(tableName)
}
