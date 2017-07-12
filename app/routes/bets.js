const router = require('express').Router()
import Bet from '../entity/Bet'
import ErrorHandler from '../util/ErrorHandler'

router.post('/', function(req, res) {

  let bet = new Bet()
  bet.save( req.body )
  .then( ( genid ) => {

    return res.send({
      id: genid
    })

  }).catch( err => {

    return res.send(ErrorHandler( err, res ))

  })

})

module.exports = router
