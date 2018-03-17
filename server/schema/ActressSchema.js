// server/schema/ActressSchema.js

const mongoose = require('mongoose')

const ActressSchema = new mongoose.Schema({
    name: {type: String, minlength:2},
    age: {type:Number, min:18},
    hiv: Boolean,
    categories:[String]
})

module.exports=ActressSchema