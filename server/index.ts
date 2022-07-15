import { graphqlHTTP } from 'express-graphql'
import express from 'express'
import bodyParser from 'body-parser'
require('dotenv').config()

const schema = require('./schema/schema')

const server = express()

server.use(bodyParser.json())

server.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

export { server }
