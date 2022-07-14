const Event = require('../models/Event')
const User = require('../models/User')

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql')

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLNonNull(GraphQLFloat) },
    date: { type: GraphQLNonNull(GraphQLString) },
  }),
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  }),
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createEvent: {
      type: EventType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        date: { type: GraphQLString },
      },
      resolve(parent, { title, description, price, date }) {
        const event = new Event({
          title,
          description,
          price,
          date: new Date(date),
        })

        return event.save()
      },
    },

    createUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, { email, password }) {
        const user = new User({
          email,
          password,
        })

        return user.save()
      },
    },
  },
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        return Event.find()
      },
    },
    event: {
      type: EventType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Event.findById(id)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
})
