
const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type:String, lowercase: true}, //required:true, unique:true, index: true    
    userName: {type: String},
    password: {type: String},    
    facebook_id: {type:String},    
    google_id: {type:String},
})

User.methods.isValidPassword = (password) => {
    return (this.password == password)
}

module.exports = mongoose.model("users", User)
