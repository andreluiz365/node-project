// server/config/mongoose.js

const config = {
    dev: {database: 'novatec'},
    test: {database: 'novatec-test'},
    prod: {database: 'novatec-prod'}
}
const database = config[process.env.NODE_ENV] ? config[process.env.NODE_ENV].database : config.dev.database

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/novatec')

const db = mongoose.connection

db.on('error', (err) =>{
    console.log(err)
})

module.exports = mongoose