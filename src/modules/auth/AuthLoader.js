import AuthModel from './AuthModel'
import { AuthenticationError } from 'apollo-server';
const jwt = require('jsonwebtoken')
const { JWT_SECRET='abcd' } = process.env;


export const loadAuthenticate = async ({email, password}) => {
  const user = await AuthModel.findByCredentials(email, password)
  const token = await user.generateAuthToken()

  return { token };
};

export const loadAddUser = async ({email, name, password, photo}) => {
  const user = new AuthModel({email, name, password, photo})
  await user.save();

  return user;
}

export const loadGetUserByToken = async ({ token }) => {
  const userId = jwt.verify(token, JWT_SECRET);
  const user = await AuthModel.findOne({ id: userId.id });
  return user;
}
