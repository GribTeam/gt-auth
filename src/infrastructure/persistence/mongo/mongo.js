const mongoose = require('mongoose')
mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URL, {
    auth: {        
        user: process.env.MONGO_DB_USER,
        password: process.env.MONGO_DB_PASSWORD,
        dbName: process.env.MONGO_DB_DATABASE,
        useNewUrlParser: true
    }
}).then(() => {
    console.log('MongoDB Connected.')
}).catch((err) => {
    console.log('MongoDB Not Connected - ' + err)
})



module.exports = mongoose