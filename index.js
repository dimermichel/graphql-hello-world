const {ApolloServer, gql, PubSub} = require('apollo-server');

//type checking
//query vs. mutation
//objects
//arrays
//arguments

//crud
//type ID is used in the frontend by Apollo to cache

const typeDefs = gql`
    type Query{
       hello(name:String): String!
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
        login(userInfo: UserInfo!) : String!
    }

    type Subscription {
        newUser: User!
    }
`;

const NEW_USER = 'NEW_USER';

const resolvers = {
    Subscription: {
        newUser: {
            subscribe: (_, __, {pubsub}) => pubsub.asyncIterator(NEW_USER)
        }
    },
    User: {
        username: parent => {
            console.log(parent);
            return parent.username
        }
    },
    Query: {
        hello: (parent, {name}) => `Hello ${name}. Welcome to my first GraphQL application.`,
        user: () => ({
            id: 123,
            username: "testUser"
        })
    },
    Mutation: {
        //args -> You can destructure the arguments
        login: async (parent, {userInfo: {username}}, context, info) => {
            //console.log(context);
            // Check the password
            // await checkPassword(password);
            return username
        },
        register: (_, {userInfo:{username} },{pubsub}) => {
            const user = {
                id: 1,
                username: username
            };
            
            pubsub.publish(NEW_USER, {
                newUser: user
            })
            return {
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
        }
        }
    }
};

const pubsub = new PubSub();

const server = new ApolloServer({typeDefs, resolvers, context: (req, res) => ({req, res, pubsub})});

server.listen().then(({url})=> console.log(`server started at ${url}`));