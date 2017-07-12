const router = require('express').Router()
import Championship from '../entity/Championship'
import ErrorHandler from '../util/ErrorHandler'

router.get('/', function(req, res) {

  let championship = new Championship()
  championship.fetchAll()
  .then( ( result ) => {
    return res.send({
      length: result.length,
      data: result
    })
  })

})

router.get('/:id', function(req, res) {

  let id = req.params.id

  let championship = new Championship()

  championship.fetchById( id )
  .then(( register ) => {
    return res.json( register )
  })
  .catch( function(error) {
    return res.json(
      ErrorHandler( error, res )
    )
  })

})

module.exports = router
