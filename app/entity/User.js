import BaseModel from '../util/BaseModel'
//import md5 from 'md5'
const md5 = require('md5')

export default class User extends BaseModel {

  getTable() {
    return 'users'
  }

  validate( data ) {

    const Joi = this.joi

    let schema = {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }

    return Joi.validate( data, schema )

  }


  fetch( data ) {

    return new Promise((res,rej) => {

      if(!data.email) {

        return rej({
          code: 400,
          message: 'email is required'
        })

      }
      // validates weither exists customer_id and movie
      let query = this.qb
      .select()
      .from(this.getTable())
      .where( 'email = ?', [ data.email ])
      .limit( 1 )

      this.db.query( query.toString(), (error, result) => {

        if(error) {
          rej(error)
        } else {
          res( result.length > 0 ? result[0] : undefined )
        }

      });


    })

  }

  save( data ) {

    if(!data)
      data = this.data

    if(data.password) {
      data.password = md5( data.password )
    }

    return super.save( data ).catch( err=> {

      if(err && err.code && err.code == 'ER_DUP_ENTRY') {

        throw ({
          code: User.VALIDATION_ERROR,
          message: 'Already exists e-mail ' + data.email
        })

      }
      else {
        throw err
      }

    })

  }

  update( id, data) {

    return super.update( id, {
      name: data.name,
      email: data.email,
      password: md5( data.password )
    })

  }

}
