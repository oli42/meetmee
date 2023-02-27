const express = require('express')
let router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user.model')



router.post('/' , async (req, res)=> {
    const user = await User.findOne({ email: req.body.email})
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
    if(isPasswordValid) {
        const message = `User is connected`;
        return res.status(200).json({ message, data: user })
    }
    else{
        const message = `A problem occurred. `;
        return res.status(400).json({ message })
    }
})

module.exports = router