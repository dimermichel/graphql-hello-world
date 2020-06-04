const {ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`
    type Query{
       hello: String!
    }
`;

const resolvers = {
    Query: {
        hello: () => 'My first GraphQL API query'
    }
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url})=> console.log(`server started at ${url}`));