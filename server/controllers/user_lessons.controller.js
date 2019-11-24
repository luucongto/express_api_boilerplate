import db from '../../config/sequelize'

const Lessons = db.lessons
const UserLessons = db.user_lessons

async function get (req, res, next) {
  try {
    var bookId = req.query.book_id
    var lessons = await Lessons.findAll({
      where: {
        book_id: bookId
      }
    })
    var userLessons = await UserLessons.findAll({
      where: {
        user_id: req.user.id
      }
    })
    var maps = { }
    userLessons.forEach(userLesson => { maps[userLesson.lesson_id] = userLessons })
    var result = []
    lessons.forEach(lesson => {
      var temp = JSON.parse(JSON.stringify(lesson))
      if (maps[lesson.id]) {
        temp.user_lesson = maps[lesson.id]
      }
      result.push(temp)
    })
    result.sort(each => each.order)
    res.json({
      data: result
    })
  } catch (e) {
    res.json({
      error: 1,
      message: e
    })
  }
}

export default { get }
