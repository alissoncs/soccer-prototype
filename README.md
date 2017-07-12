# movie-checker

To start this API
Rename `app/config.json.example` to `app/config.json` and check the database configs
Run `dump.sql`
```
$ npm install
$ npm start
```

## Authentication

To authenticate you get the jwt token using this Endpoint

## Endpoints

Method | Endpoint | Description
------ | -------- | -----------
GET | /movies | Retrive all movies registered
GET | /movies/{id} | Retrive a movie
GET | /movies/search/{name} | Retrive all movies filtered by name
POST | /movies | Register a movie
PUT | /movies/{id} | Update a movie by id (full payload)
DELETE | /movies/{id} | Delete a movie by id
GET | /customers | Retrive all customers registered
GET | /customers/{id} | Retrive a customer
GET | /customers/search/{name} | Retrive all customers filtered by name
POST | /customers | Register a customer
PUT | /customers/{id} | Update a customer by id (full payload)
DELETE | /customers/{id} | Delete a customer by id

## Renting endpoints

Method | Endpoint | Description
------ | -------- | -----------
GET | /renting | Retrive all renting movies (movie and customer)
POST | /renting | Rent a movie
DELETE | /renting/{rent_id} | Return a movie
