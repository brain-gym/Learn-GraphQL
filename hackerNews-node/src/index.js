const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => "This is an api for hackernews clone",
    feed: () => links,
    Link: (parent, args) => {
      return links.filter((x) => x.id === args.id)[0];
    },
  },
  //   Link: {
  //     id: (parent) => parent.id,
  //     description: (parent) => parent.description,
  //     url: (parent) => parent.url,
  //   },

  Mutation: {
    post: (parent, args) => {
      let link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
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
});

server.start(() => {
  console.log("server is listening at port 4000");
});
