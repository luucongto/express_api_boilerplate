import constants from '../../config/constants'
const tableName = 'user_lessons'
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(tableName, {
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
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: tableName
  })

  return Model
}
