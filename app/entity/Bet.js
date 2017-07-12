import BaseModel from '../util/BaseModel'

var _ = require('lodash');

export default class Bet extends BaseModel {

  getTable() {

    return 'bets'

  }

  validate( data ) {

    const Joi = this.joi

    let schema = {
      match_id: Joi.number().required(),
      team1_score: Joi.number().required(),
      team2_score: Joi.number().required(),
      user_id: Joi.number().optional()
    }

    return Joi.validate( data, schema )

  }

  save( data ) {

    // already make a bet to this match
    return this.fetchBy( data )
    .then( already => {
      if(already) {
        throw ({
          code: 400,
          message: 'You already do this bet'
        })
      }
      return this.save( data )
    })

  }

  fetchBy( opts ) {

    return this.qb(this.getTable())
    .where({
      match_id: opts.match_id,
      user_id: opts.user_id
    })
    .first()

  }

}
