const express = require('express')
let router = express.Router()
const User = require('../models/user.model')

router.get('/', async (req, res)=> {
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
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })

    try{
        const newuser = await user.save()
        res.status(201).json(newuser)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.delete('/:id', getUser, async (req, res) => {
try {
    await res.user.remove()
    return res.json({ message: 'User deleted'})
} catch {
    return res.status(500).json({ message: err.message })
}
})

async function getUser(req, res, next){
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null)
            return res.status(404).json({ message: 'Cannot find user'})
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

module.exports = router