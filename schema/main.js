const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLBoolean
} = require('graphql');

const roll = () => Math.floor(6 * Math.random()) + 1;

const toTitleCase = str =>
  str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

const PersonType = new GraphQLInterfaceType({
  name: 'Person',
  fields: {
    name: { type: GraphQLString }
  }
});
const LetterCaseType = new GraphQLEnumType({
  name: 'LetterCase',
  values: {
    TITLE: { value: 'title' },
    UPPER: { value: 'upper' },
    LOWER: { value: 'lower' }
  }
});
const EmployeeType = new GraphQLObjectType({
  name: 'Employee',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        upperCase: { type: GraphQLBoolean }
      },
      resolve: (obj, args) => {
        const fullName = `${obj.firstName} ${obj.lastName}`;
        return args.upperCase ? fullName.toUpperCase() : fullName;
      }
    },
    nameForCase: {
      type: GraphQLString,
      args: {
        letterCase: { type: LetterCaseType }
      },
      resolve: (obj, args) => {
        const fullName = `${obj.firstName} ${obj.lastName}`;
        switch (args.letterCase) {
          case 'lower':
            return fullName.toLowerCase();
          case 'upper':
            return fullName.toUpperCase();
          case 'title':
            return toTitleCase(fullName);
          default:
            return fullName;
        }
      }
    },
    boss: { type: EmployeeType }
  })
});

const VendorType = new GraphQLObjectType({
  name: 'Vendor',
  fields: {
    name: { type: GraphQLString },
    companyName: { type: GraphQLString }
  },
  interfaces: [PersonType]
});

const ContactType = new GraphQLObjectType({
  name: 'Contact',
  fields: {
    person: PersonType,
    phoneNumber: { type: GraphQLString },
    emailAddress: { type: GraphQLString }
  }
});

const exampleEmployee = {
  firstName: 'jane',
  lastName: 'doe'
};

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
    },
    exampleEmployee: {
      type: EmployeeType,
      resolve: () => exampleEmployee
    }
  }
});
const mySchema = new GraphQLSchema({
  query: queryType
});

module.exports = mySchema;
