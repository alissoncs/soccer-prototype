import BaseModel from '../util/BaseModel'

var _ = require('lodash');

export default class Championship extends BaseModel {

  getTable() {
    return 'championships'
  }

  validate( data ) {

    const Joi = this.joi

    let schema = {
      title: Joi.string().required(),
      amount: Joi.number().optional()
    }

    return Joi.validate( data, schema )

  }

  save( data ) {

    if(!data)
      data = this.data

    return super.save( {
      title: data.title,
      amount: data.amount ? data.amount : 1
    } )

  }

  fetchAll( opts ) {

    // query for championships with active round
    return super.fetchAll()

  }

  fetchById( id ) {
    const query = this.qb
    .from('matches')
    .select('*')
    .leftJoin('rounds', 'matches.round_id', 'rounds.id')
    .leftJoin('championships', 'rounds.championship_id', 'championships.id')
    .leftJoin('teams as team1', 'matches.team1', 'team1.id')
    .leftJoin('teams as team2', 'matches.team2', 'team2.id')
    .where('rounds.date', '<', this.db.fn.now())
    .andWhere('rounds.date_limit', '>', this.db.fn.now())
    .andWhere('championships.id', id)
    .orderBy('matches.date')
    .options({nestTables: true, rowMode: 'array'})

    let custom = {}

    return query.then( res => {

      if(res.length > 0) {
          custom = res[0].championships
          custom.rounds = []

          // filter rounds
          res.forEach(item => {

            item.rounds.matches = []

            if(!custom.rounds.length) {
              custom.rounds.push(item.rounds)
            } else {
              if(custom.rounds[custom.rounds.length-1].id != item.rounds.id) {
                custom.rounds.push(item.rounds)
              }
            }

          })

          // filter matches
          custom.rounds.forEach( item => {

            let { id } = item

            res.forEach((sms) => {
              if(sms.matches.round_id = id) {

                sms.matches.team1 = sms.team1
                sms.matches.team2 = sms.team2

                if(item.matches) {
                  item.matches.push( sms.matches )
                } else {
                  item.matches = [ sms.matches ]
                }
              }
            })


          }) // endForeach



      }

      return custom

    })

  }

  update( id, data) {

    return super.update( id, {
      title: data.title,
      amount: data.amount
    })

  }

}
