const express = require ('express')
const app = express()

require ('dotenv').config()

const PORT = process.env.PORT || 3000
const dbConnection = require ('./config/config')
const routes = require ('./routes/posts')

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use ('/', routes)

dbConnection()


app.listen(PORT, () => {console.log(`Server started on port http://localhost:${PORT}`)})

module.exports = app