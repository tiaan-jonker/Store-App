const express = require('express')
const bodyParser = require('body-parser')
const colors = require('colors')
const { graphqlHTTP } = require('express-graphql')
require('dotenv').config()

const connectDB = require('./config/dbConfig')
const schema = require('./schema/schema')

const PORT = 5000

const server = express()

connectDB()

server.use(bodyParser.json())

server.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

server.listen(PORT, console.log(`Listening on port: ${PORT}`.cyan.bold))
