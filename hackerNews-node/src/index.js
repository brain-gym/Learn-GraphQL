const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");
const Link = require("./resolvers/Link");
const User = require("./resolvers/User");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const Vote = require("./resolvers/Vote");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Link,
  User,
  Vote,
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});

server.start(() => {
  console.log("server is listening at port 4000");
});
