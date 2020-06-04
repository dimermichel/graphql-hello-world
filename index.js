const {ApolloServer, gql} = require('apollo-server');

//type checking
//query vs. mutation
//objects
//arrays
//arguments

//crud
//type ID is used in the frontend by Apollo to cache

const typeDefs = gql`
    type Query{
       hello: String!
       user: User
    }

    type User {
        id: ID!
        username: String!
    }

    type Error {
        field: String!
        message: String!
    }

    type RegisterResponse {
        errors: [Error] 
        user: User
    }

    input  UserInfo {
        username: String!
        password: String!
        age: Int
    }

    type Mutation {
        register(userInfo: UserInfo!): RegisterResponse!
        login(username: String!, password: String!) : Boolean!
    }
`;

const resolvers = {
    Query: {
        hello: () => 'My first GraphQL API query',
        user: () => ({
            id: 123,
            username: "testUser"
        })
    },
    Mutation: {
        login: () => true,
        register: () => ({
            errors: null,
            // errors: [{
            //     field: 'username',
            //     message: 'This field is required.'
            // },
            // {
            //     field: 'password',
            //     message: 'This field is required.'
            // }],
            user: {
                id: 1,
                username: 'Michel'
            }
        })
    }
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url})=> console.log(`server started at ${url}`));