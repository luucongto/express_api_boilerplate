import db from '../../config/sequelize'

const User = db.User
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
