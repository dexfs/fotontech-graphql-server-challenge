import * as AuthLoader from './AuthLoader';

export const typeDefs = `
  type Auth {
    token: String
  },
  type User {
    id: String,
    email: String!,
    name: String!,
    photo: String
  }
`;

export const resolvers = {
  getUserByToken: async(_, args) => {
    const user = await AuthLoader.loadGetUserByToken(args);
    return user;
  }
};

export const mutations = {
  addUser: async(_, args, context, info) => {
    const user = await AuthLoader.loadAddUser(args);
    return user;
  },
  authenticate: async (_, args, context, info) => {
    const token = await AuthLoader.loadAuthenticate(args)
    return token;
  },
}
