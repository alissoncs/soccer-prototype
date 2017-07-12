const router = require('express').Router()

let authmd = require('../middlewares/authmd')

// users endpoint
router.use('/users', require('./users'))
router.use('/championships', require('./championships'))
router.use('/auth', require('./authentication'))

module.exports = router
