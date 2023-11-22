import { ApolloServer } from '@apollo/server';
import mongoose from 'mongoose';
import typedef from './graphql/typedef.js';
import resolver from './graphql/resolver.js';
import { startStandaloneServer } from '@apollo/server/standalone';
const username = "janani";
const password = "kowsijana";
const clusterName = "cluster0.klghah5.mongodb.net";
const dbName = "Food";

const MONGODB = `mongodb+srv://${username}:${password}@${clusterName}/${dbName}?retryWrites=true&w=majority`;

const server = new ApolloServer({
  typeDefs: typedef,
  resolvers: resolver,
});

mongoose.connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected successfully')
  })

const { url } = await startStandaloneServer(server, {
  listen: { port: 8000 }
})
