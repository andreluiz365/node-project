// server/repository/FilmesRepository.js

const mongoose = require('../config/mongoose')
const FilmesSchema = require('../schema/FilmesSchema')

const FilmesRepository = mongoose.model('Filmes', FilmesSchema)

module.exports = FilmesRepository