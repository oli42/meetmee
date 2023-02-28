const jwt = require('jsonwebtoken')
require('dotenv').config

async function checkAuth(req, res, next){
    const token = req.cookies.meetmee;
    if (!token)
        return res.status(401).json('No token available')
    
    jwt.verify(token, process.env.JWT_SECRET, (err, firstName) => {
        if (err) {
            return res.status(403).json('Invalid token')
        }
        // req.firstName = {
        //     firtName: firstName
        // }
        next();
    })
}

module.exports = checkAuth