import '@babel/polyfill'

import config from './config/config'
import app from './config/express'
/* eslint-disable no-unused-vars */
import db from './config/sequelize'

const debug = require('debug')('newsai-api:index')
/* eslint-enable no-unused-vars */

// make bluebird default Promise
Promise = require('bluebird') // eslint-disable-line no-global-assign
try {
  db.sequelize.sync({force: true});
  console.log("All models were synchronized successfully.");
} catch(err) {
  console.error("Sequelize error: " + err)
}
// module.parent check is required to support mocha watch
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`) // eslint-disable-line no-console
  })
}

export default app
