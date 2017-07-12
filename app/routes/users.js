const router = require('express').Router()
import User from '../entity/User'
import ErrorHandler from '../util/ErrorHandler'
let authmd = require('../middlewares/authmd')

router.put('/:id', authmd, function(req, res) {

  let user = new User()
  user.update( req.params.id, req.body )
  .then(( ) => {
    return res.status( 200 ).json({
      'message': 'Updated with success'
    })
  })
  .catch( function(error) {
    return res.json(
      ErrorHandler( error, res )
    )
  })

})

router.post('/', function( req, res) {

  let user = new User( req.body )

  // try to save
  user.save()
    .then( ( id ) => {

      return res.json({
        id
      })

    })
    .catch( function(error) {
      return res.json(
        ErrorHandler( error, res )
      )
    })

})

module.exports = router
