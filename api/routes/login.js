require('dotenv').config
const express = require('express')
let router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')
const User = require('../models/user.model')

router.post('/' , async (req, res)=> {
    try{

        const user = await User.findOne({ email: req.body.email})
        if (!user){
            const message = `User doesn't exist `;
            return res.status(404).json({ message })
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
        
        if(isPasswordValid) {
            const message = `User is connected`;
            const accesToken = jwt.sign(user.firstName, process.env.JWT_SECRET)
            user.email = undefined;
            user.password = undefined;
            user.lastName = undefined;
    
            res.cookie('meetmee', accesToken, {
                secure: false,
                httpOnly: true,
                expires: dayjs().add(1, "days").toDate(),
                sameSite: 'lax'
            });
    
            return res.status(200).json({ message, data: user})
        }
        else{
            const message = `A problem occurred. `;
            return res.status(400).json({ message })
        }
    } catch {
        return res.status(500).json(err.message)
    }
})

module.exports = router