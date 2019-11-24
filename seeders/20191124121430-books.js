'use strict'
import 'babel-polyfill'
import constants from '../config/constants'
const tableName = 'books'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    var now = new Date()
    await queryInterface.bulkInsert(tableName, [{
      id: 1,
      name: 'Con là thiên tài Piano 1',
      level: 1,
      header_url: 'header_url',
      header_url_locked: 'header_url_locked',
      price: '399.0000đ',
      order: 100,
      background_url: 'background_url',
      created_at: now,
      updated_at: now
    },
    {
      id: 2,
      name: 'Con là thiên tài Piano 2',
      level: 2,
      header_url: 'header_url',
      header_url_locked: 'header_url_locked',
      price: '399.000đ',
      order: 99,
      background_url: 'background_url',
      created_at: now,
      updated_at: now
    },
    {
      id: 3,
      name: 'Con là thiên tài Piano 3',
      level: 3,
      header_url: 'header_url',
      header_url_locked: 'header_url_locked',
      price: 0,
      order: 98,
      background_url: 'background_url',
      created_at: now,
      updated_at: now
    },
    {
      id: 4,
      name: 'Con là thiên tài Piano 4',
      level: 4,
      header_url: 'header_url',
      header_url_locked: 'header_url_locked',
      price: 0,
      order: 97,
      background_url: 'background_url',
      created_at: now,
      updated_at: now
    }], {})
  },

  down: (queryInterface, Sequelize) => {

  }
}
