const { graphql } = require('graphql');
const readline = require('readline');
const { MongoClient } = require('mongodb');
const assert = require('assert');

const mySchema = require('./schema/main');

const MONGO_URL = 'mongodb://localhost:27017/test';

MongoClient.connect(MONGO_URL, (err, db) => {
  assert.equal(null, err);
  console.log('Connected to MongoDB server');
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
