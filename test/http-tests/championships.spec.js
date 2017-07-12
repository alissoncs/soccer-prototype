const app = require('../../app/application.js')
const chai = require('chai')
chai.use( require('chai-http') )
const { assert } = chai

describe('championships', () => {

  it('should accept a get method', done => {

    chai.request( app )
    .get('/championships')
    .end((err, res) => {

      // assertions
      assert.typeOf( res.body, 'Object' )
      let { data }  = res.body
      assert.isArray( data )
      assert.lengthOf( data, 2 )
      assert.containsAllKeys( data[0], ['id', 'name', 'active', 'country'] )

      done()

    })

  })

})
