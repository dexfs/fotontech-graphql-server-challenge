import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

import * as AuthType from './src/modules/auth/AuthType';
import * as ProductType from './src/modules/product/ProductType';

const SchemaDefinition = `
  schema {
    query: Query,
    mutation: Mutation
  }
  type Query {
    getAllProducts(search: String, page: Int!, limit: Int!): Products,
    getProductById(id: String!): Product,
    getUserByToken(token: String!): User
  },
  type Mutation {
    addUser(email: String!, name: String!, password: String!, photo: String): User,
    addProduct(name: String!, description: String, quantity: Int!, value: Float!): Product,
    authenticate(email: String!, password: String!): Auth
  }
`;

const typeDefs = [
  AuthType.typeDefs,
  ProductType.typeDefs
];

const resolvers = {
  Query: {
    ...AuthType.resolvers,
    ...ProductType.resolvers
  },
  Mutation: {
    ...AuthType.mutations,
    ...ProductType.mutations
  }
};

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, ...typeDefs],
  resolvers
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
