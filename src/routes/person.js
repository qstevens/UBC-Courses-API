let express = require('express')
let router = express.Router()

// QueryString => query property on the request objects
// localhost:3000/person?name=stevens&age=21
router.get('/person', (req, res) => {
    if(req.query.name) {
        res.send(`You have requested a person ${req.query.name}`)
    } else {
        res.send('You have requested a person')
    }
})

// Params property on the request object
// localhost:3000/person/stevens
router.get('/person/:name', (req, res) => {
    res.send(`You have requested a person ${req.params.name}`)
})

module.exports = router