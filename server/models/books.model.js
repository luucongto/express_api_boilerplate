const tableName = 'books'
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(tableName, {
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
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: tableName
  })

  return Model
}
