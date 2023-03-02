const express = require('express')
let router = express.Router()


router.get('/', (req, res) =>{

    const responseHeaders = {
        "Content-Type": "application/json",
        "set-cookie": [
          `meetmee=''; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;`,
        ],
    };
    res.writeHead(204, responseHeaders);
    res.end();
})

module.exports = router