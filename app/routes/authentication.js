const router = require('express').Router()
import User from '../entity/User'
import ErrorHandler from '../util/ErrorHandler'

const jwt = require('jwt-simple')
const moment = require('moment')
const md5 = require('md5')

router.post('/', (req, res) => {

  let user = new User

  user.fetch( req.body )
  .then((data) => {

    let passOk = false

    if(data && req.body.password) {
      passOk = md5(req.body.password) == data.password
    }

    if( !data || !passOk ) {
      return res.status(401).json(
        ErrorHandler( {
          code: 401,
          message: 'email or password not match'
        }, res)
      )
    }

    // generates the jwt token
    let expires = moment().add(3, 'days').valueOf()

    let token = jwt.encode({
      iss: data.id,
      exp: expires
    }, 'the_jwt_key')

    res.json({
      token: token,
      expires_at: expires
    })

  })
  .catch((err) => {
    res.json(ErrorHandler( err, res ))
  })


})

module.exports = router
