# graphqlRelay
Aplicación React con GraphQL y Relay.

## HTTP-mounted GraphQL executor
http://localhost:3000/graphql?query={usersCount}

## The GraphiQL editor
app.use('/graphql', graphqlHTTP({
  schema: mySchema,
  context: { db },
  graphiql: true
}));
http://localhost:3000/graphql