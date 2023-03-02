const express = require('express')
let router = express.Router()
const bcrypt = require('bcrypt')
const checkAuth = require('../middlewares/checkAuth.js')
const checkUser = require('../middlewares/checkUser.js')
const User = require('../models/user.model')



router.get('/', checkAuth, async (req, res)=> {
    try{
        const users = await User.find()
        res.json(users)
    } catch(err){
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', (req, res)=> {
    res.send(`hello ${req.params.id}` )
})

router.post('/' , async (req, res)=> {

    const exist = await User.findOne({ email: req.body.email})
    if (exist){
        return res.status(404).json({ message: 'A user already uses this email'})
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword 
    })

    try{
        const newuser = await user.save()
        res.status(201).json(newuser.firstName)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})



router.delete('/:id', checkUser, async (req, res) => {
try {
    await res.user.remove()
    return res.json({ message: 'User deleted'})
} catch {
    return res.status(500).json({ message: err.message })
}
})

module.exports = router