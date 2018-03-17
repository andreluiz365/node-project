// server/repository/ActressRepository.js

const mongoose = require('../config/mongoose')
const ActressSchema = require('../schema/ActressSchema')

const ActressRepository = mongoose.model('Actress', ActressSchema)

module.exports = ActressRepository