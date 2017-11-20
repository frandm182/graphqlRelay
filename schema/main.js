/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');

const QuoteType = new GraphQLObjectType({
  name: 'Quote',
  fields: {
    id: {
      type: GraphQLString,
      resolve: obj => obj._id
    },
    text: { type: GraphQLString },
    author: { type: GraphQLString }
  }
});

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    usersCount: {
      description: 'Total number of users in the database',
      type: GraphQLInt,
      resolve: (_, args, { db }) => db.collection('users').count()
    },
    allQuotes: {
      type: new GraphQLList(QuoteType),
      description: 'A list of the quotes in the database',
      resolve: (_, args, { db }) =>
        db
          .collection('quotes')
          .find()
          .toArray()
    }
  }
});
const mySchema = new GraphQLSchema({
  query: queryType
});

module.exports = mySchema;
