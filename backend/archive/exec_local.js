var path = require('path')

require('dotenv').config({ path: path.resolve('../../.env')})
var archive = require('./index.js')
archive.handler()
