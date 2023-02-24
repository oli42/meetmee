require('dotenv').config()
const express = require('express')
const app = express()
const users = require('./routes/users')

const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('connected', ()=> console.log('Connected to db'))

app.use(express.json())
    .use('/users', users)

app.listen(process.env.PORT, ()=> console.log('server is connected'))