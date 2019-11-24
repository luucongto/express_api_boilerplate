import db from '../../config/sequelize'

const Books = db.books
const UserBooks = db.user_books

async function get (req, res, next) {
  try {
    var books = await Books.findAll()
    var userBooks = await UserBooks.findAll({
      where: {
        user_id: req.user.id
      }
    })
    var maps = { }
    userBooks.forEach(userBook => { maps[userBook.book_id] = userBooks })
    var result = []
    books.forEach(book => {
      var temp = JSON.parse(JSON.stringify(book))
      if (maps[book.id]) {
        temp.unlocked = true
      }
      result.push(temp)
    })
    result.sort(each => -each.order)
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
