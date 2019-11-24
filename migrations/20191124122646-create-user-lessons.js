'use strict'
import 'babel-polyfill'
import constants from '../config/constants'
const tableName = 'user_lessons'
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable(tableName, {
      user_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
      },
      lesson_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: constants.USER_LESSON_STATUS.UNLOCKED
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
  },

  down: (queryInterface, DataTypes) => queryInterface.dropTable(tableName)
}
