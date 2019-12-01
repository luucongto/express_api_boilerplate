'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var now = new Date()
    const adminUser = {
      email: 'sotatek.test@gmail.com',
      username: 'admin',
      display_name: 'Admin',
      password: '$2a$12$p2edt3uZO9.OF9uyRU0nV.pSyN2OkuSPhWCVhHlyE9DbsJdjC6pI6',
      status: 1,
      role: 1,
      created_at: now,
      updated_at: now
    }

    return queryInterface.bulkInsert('users', [
      adminUser
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
}
