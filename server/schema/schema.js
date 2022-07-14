const axios = require('axios')
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
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    date: { type: GraphQLString },
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
        return axios
          .post(`http://localhost:3000/events`, {
            title,
            description,
            price,
            date,
          })
          .then((res) => res.data)
      },
    },
  },
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    event: {
      type: EventType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return axios
          .get(`http://localhost:3000/events/${id}`)
          .then((res) => res.data)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
})
