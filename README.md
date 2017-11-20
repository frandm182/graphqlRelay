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

## RootQuery Types
query TypeFields {
  __type(name: "RootQuery") {
    fields {
      name
      description
      args {
        name
      }
    }
  }
}

## QueryType Name
query QueryTypeName {
  __schema {
    queryType {
      name
    }
  }
}

## SchemaDirectives Name
query SchemaDirectives {
  __schema {
    directives {
      name
      description
      args {
        name
        description
      }
    }
  }
}
## RootQuery ofTypes
query TypeFields {
  __schema {
    queryType {
      fields {
        name
        type {
          kind
          name,
          ofType {
            kind,
            name
          }
        }
      }
    }
  }
}

## InstrospectionQuery
query IntrospectionQuery {
    __schema {
      queryType { name }
      mutationType { name }
      subscriptionType { name }
      types {
        ...FullType
      }
      directives {
        name
        description
        locations
        args {
          ...InputValue
        }
      }
    }
  }
  fragment FullType on __Type {
    kind
    name
    description
    fields(includeDeprecated: true) {
      name
      description
      args {
        ...InputValue
      }
      type {
        ...TypeRef
      }
      isDeprecated
      deprecationReason
    }
    inputFields {
      ...InputValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues(includeDeprecated: true) {
      name
      description
      isDeprecated
      deprecationReason
    }
    possibleTypes {
      ...TypeRef
    }
  }
  fragment InputValue on __InputValue {
    name
    description
    type { ...TypeRef }
    defaultValue
  }
  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                }
              }
            }
          }
        }
      }
    }
  }
