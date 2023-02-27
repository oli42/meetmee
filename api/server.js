require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const users = require('./routes/users')
const log = require('./routes/login')

const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('connected', ()=> console.log('Connected to db'))


app.use(express.json())
    .use(cors())
    .use('/users', users)
    .use('/login', log)


app.listen(process.env.PORT, ()=> console.log('server is connected'))