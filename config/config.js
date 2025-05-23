const mongoose = require('mongoose')
require('dotenv').config()

const dbConnection = async () => {
    try {
        console.log (process.env.MONGO_URI)
        await mongoose.connect (process.env.MONGO_URI)
        console.log ('Successfully connected to the database')
    } catch (error) {
        console.error (error)
        throw new Error ('Database startup error')
    }
}

module.exports = dbConnection