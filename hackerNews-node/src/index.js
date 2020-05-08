const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
type Query{
    info : String!
    feed : [Link!]!
}
type Link{
    id: ID!
    description: String!
    url: String!
}
`
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]
const resolvers = {
    Query: {
        info: () => "This is an api for hackernews clone",
        feed: () => links
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
})

server.start(() => {
    console.log("server is listening at port 4000")
})