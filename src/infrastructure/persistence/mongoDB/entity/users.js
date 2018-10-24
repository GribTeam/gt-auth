
const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type:String, required:true, lowercase: true, unique:true, index: true},
    facebook_id: {type:String},
    google_id: {type:String}
})

module.exports = mongoose.model("users", User)
