const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const roll = () => Math.floor(6 * Math.random()) + 1;

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'world'
    },
    diceRoll: {
      type: new GraphQLList(GraphQLInt),
      args: {
        count: {
          type: GraphQLInt,
          defaultValue: 2
        }
      },
      resolve: (_, args) => {
        const rolls = [];
        for (let i = 0; i < args.count; i += 1) {
          rolls.push(roll());
        }

        return rolls;
      }
    },
    usersCount: {
      description: 'Total number of users in the database',
      type: GraphQLInt,
      resolve: (_, args, { db }) => db.collection('users').count()
    }
  }
});
const mySchema = new GraphQLSchema({
  query: queryType
});

module.exports = mySchema;
