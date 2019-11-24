const USER_GUEST = -1
const USER_NORMAL = 0
const USER_TYPE_CHOICES = [
  USER_GUEST,
  USER_NORMAL
]

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      // eslint-disable-next-line no-undef
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      // eslint-disable-next-line new-cap
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      // eslint-disable-next-line new-cap
      type: DataTypes.STRING(512),
      allowNull: true
    },
    user_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: USER_GUEST,
      validate: {
        isInt: {
          args: [USER_TYPE_CHOICES],
          msg: 'Must be guest or normal'
        }
      }
    },
    display_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    picture: {
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
    tableName: 'users'
  })

  return User
}
