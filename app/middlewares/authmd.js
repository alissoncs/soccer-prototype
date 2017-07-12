const jwt = require('jwt-simple')
const moment = require('moment')
const md5 = require('md5')

import User from '../entity/User'

module.exports = (req, res) => {

  // reference
  // http://rcdevlabs.github.io/2015/02/12/como-criar-uma-api-restfull-em-nodejs-e-autenticar-usando-json-web-token-jwt/

  // validate token
  let {authorization} = req.headers
  const token = authorization

  if(!token) {
    return res.status(401).json({
      code: 401,
      message: 'Authorization required'
    })
  }

  let decoded

  try {
      decoded = jwt.decode( token, 'the_jwt_key', true )

      let { exp } = decoded

      if( exp <= Date.now()) {
        return res.status(401).json({
          code: 401,
          message: 'Expired token'
        })
      }

  } catch( err ) {

    return res.status(401).json({
      code: 401,
      message: 'Invalid token'
    })

  }

  if(decoded) {

    let { iss } = decoded

    let user = new User
    user.fetchById( iss )
    .then(data => {
      res.user = data
      req.next()
    }).catch(err => {

      return res.status(401).json({
        code: 401,
        message: 'Invalid user with this token'
      })

    })

  }

}
