const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const resolvers = {
  Query: {
    info: () => "This is an api for hackernews clone",
    feed: (parent, args, context, info) => context.prisma.links(),
    Link: (parent, args) => {
      return links.filter((x) => x.id === args.id)[0];
    },
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },

  Mutation: {
    post: (parent, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      });
    },

    update: (parent, args) => {
      links.forEach((x) => {
        if (x.id == args.id) {
          x.url = args.url;
        }
      });
      return links.filter((x) => x.id === args.id)[0];
    },
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma },
});

server.start(() => {
  console.log("server is listening at port 4000");
});
