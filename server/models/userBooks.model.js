const tableName = 'user_books'
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(tableName, {
    user_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    book_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
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
