const { graphql } = require('graphql');
const readline = require('readline');
const { MongoClient } = require('mongodb');
const assert = require('assert');
const graphqlHTTP = require('express-graphql');
const express = require('express');
const mySchema = require('./schema/main');

const app = express();
const MONGO_URL = 'mongodb://localhost:27017/test';

MongoClient.connect(MONGO_URL, (err, db) => {
  assert.equal(null, err);
  app.use(
    '/graphql',
    graphqlHTTP({
      schema: mySchema,
      context: { db }
    })
  );
  app.listen(3000, () => console.log('Running Express.js on port 3000'));
  const rli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rli.question('Client Request: ', inputQuery => {
    graphql(mySchema, inputQuery, {}, { db }).then(result => {
      console.log('Server Answer: ', result.data);
    });
    rli.close();
  });
});
