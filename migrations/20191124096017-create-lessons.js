'use strict'
import 'babel-polyfill'
import constants from '../config/constants'
const tableName = 'lessons'
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
        allowNull: false
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: true
      },
      book_id: {
        type: DataTypes.BIGINT,
        defaultValue: 0
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: constants.SONG_LEVEL.EASY
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      lesson_type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: constants.LESSON_TYPE.LOTTIE
      },
      content_url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lesson_type2: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: constants.LESSON_TYPE.LOTTIE
      },
      content_url2: {
        type: DataTypes.STRING,
        allowNull: true
      },
      name2: {
        type: DataTypes.STRING(128),
        allowNull: true
      },
      lesson_type3: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: constants.LESSON_TYPE.LOTTIE
      },
      content_url3: {
        type: DataTypes.STRING,
        allowNull: true
      },
      name3: {
        type: DataTypes.STRING(128),
        allowNull: true
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
  },

  down: (queryInterface, DataTypes) => queryInterface.dropTable(tableName)
}
