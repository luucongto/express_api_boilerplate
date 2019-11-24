'use strict'
import 'babel-polyfill'
import constants from '../config/constants'
const tableName = 'lessons'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    var now = new Date()
    await queryInterface.bulkInsert(tableName, [{
      name: 'Bài 1',
      book_id: 1,
      level: constants.SONG_LEVEL.EASY,
      cost: 0,
      lesson_type: constants.LESSON_TYPE.VIDEO,
      content_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      lesson_type2: constants.LESSON_TYPE.VIDEO,
      content_url2: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      name2: 'Con Ong Xinh',
      background_url: 'url',
      created_at: now,
      updated_at: now
    },
    {
      name: 'Bài 2',
      book_id: 1,
      lesson_type: constants.LESSON_TYPE.VIDEO,
      level: constants.SONG_LEVEL.EASY,
      cost: 0,
      content_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      lesson_type2: constants.LESSON_TYPE.VIDEO,
      content_url2: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      name2: 'Con Ong Xinh',
      lesson_type3: constants.LESSON_TYPE.VIDEO,
      content_url3: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      name3: 'Con Ong Xinh',
      background_url: 'url',
      created_at: now,
      updated_at: now
    },
    {
      name: 'Bài 3',
      book_id: 1,
      lesson_type: constants.LESSON_TYPE.VIDEO,
      level: constants.SONG_LEVEL.EASY,
      cost: 0,
      content_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      background_url: 'url',
      created_at: now,
      updated_at: now
    },
    {
      name: 'Hay trao cho anh',
      desc: 'Son Tung MTP',
      book_id: 1,
      lesson_type: constants.LESSON_TYPE.VIDEO,
      level: constants.SONG_LEVEL.EASY,
      cost: 0,
      content_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      background_url: 'url',
      created_at: now,
      updated_at: now
    },
    {
      name: 'Đi Đu Đưa Đi',
      desc: 'Bích Phương',
      book_id: 0,
      lesson_type: constants.LESSON_TYPE.VIDEO,
      level: constants.SONG_LEVEL.EASY,
      cost: 0,
      content_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      background_url: 'url',
      created_at: now,
      updated_at: now
    },
    {
      name: 'Bài 2',
      book_id: 0,
      lesson_type: constants.LESSON_TYPE.VIDEO,
      level: constants.SONG_LEVEL.MEDIUM,
      cost: 0,
      content_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      background_url: 'url',
      created_at: now,
      updated_at: now
    },
    {
      name: 'Bài 3',
      book_id: 0,
      lesson_type: constants.LESSON_TYPE.VIDEO,
      level: constants.SONG_LEVEL.HARD,
      cost: 0,
      content_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      background_url: 'url',
      created_at: now,
      updated_at: now
    },
    {
      name: 'Bài 4',
      book_id: 0,
      lesson_type: constants.LESSON_TYPE.VIDEO,
      level: constants.SONG_LEVEL.EASY,
      cost: 0,
      content_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      background_url: 'url',
      created_at: now,
      updated_at: now
    }], {})
  },

  down: (queryInterface, Sequelize) => {

  }
}
