// server/schema/FilmesSchema.js

const mongoose = require('mongoose')

const FilmesSchema = new mongoose.Schema({
    name: {type: String, required:true, minlength:2},
    time: {type: Number, min:2},
    categories:[String]
})

module.exports=FilmesSchema