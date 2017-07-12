import BaseModel from '../util/BaseModel'

export default class Movie extends BaseModel {

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

  let matchesQuery = `\
    SELECT\
    m.date as date,\
    t.name as team1_name,\
    t2.name as team2_name,\
    team1, team2,\
    r.date as round_date,\
    r.date_limit as round_date_limit,\
    c.country,\
    round_id,\
    m.id as match_id\
    FROM matches as m\
    INNER JOIN rounds as r ON m.round_id = r.id\
    INNER JOIN championships as c ON r.championship_id = c.id AND c.id = ${id}\
    INNER JOIN teams as t ON t.id = team1\
    INNER JOIN teams as t2 ON t2.id = team2\
    WHERE r.date < NOW() AND r.date_limit > NOW()\
    ORDER BY m.date;`

    const { db }  = this

    let matchesPromise = new Promise((res, rej) => {
      db.query( matchesQuery, (err, matches) => {
        if(err) return rej(err)
        return res( matches )
      })
    })

    return super.fetchById( id )
    .then(data => {

      return matchesPromise.then(matches => {
        data.matches = matches
        return data
      })

    })

  }

  update( id, data) {

    return super.update( id, {
      title: data.title,
      amount: data.amount
    })

  }

}
