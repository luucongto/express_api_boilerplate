import db from '../../config/sequelize'

const User = db.users
async function getUserByUsername (username) {
  var user = await User.findOne({
    where: {
      username
    },
    attributes: [
      'id',
      'username'
    ]
  })
  return user
}

export default { getUserByUsername }
