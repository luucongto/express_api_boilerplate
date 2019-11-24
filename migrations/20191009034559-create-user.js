import 'babel-polyfill'
import constants from '../config/constants'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(512),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      display_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: true
      },
      user_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: constants.USER_USER_TYPE_GUEST
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
    await queryInterface.addIndex('users', ['username'])
    await queryInterface.addIndex('users', ['email'])
    await queryInterface.addIndex('users', ['user_type'])
  },

  down: (queryInterface, Sequelize) => queryInterface.dropTable('users')
}
