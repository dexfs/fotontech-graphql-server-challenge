const mongoose = require('mongoose');
const validator = require("validator");
const { mongooseConnection } = require('./../../config/mongooseConnection')
const bcrypt = require('./../../utils/bcryptjs-promise');
const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server');
const { JWT_SECRET = 'abcd' } = process.env;
const Schema = mongoose.Schema;
const User = new Schema({
    name: {
      type: String,
      require: true,
      trim: true,
    },
    photo: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      minlength: 10,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email"
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    }
  });

User.methods = {
    toJSON() {
      const user = this;
      const userObject = user.toObject();

      return _.pick(userObject, ["_id", "email", "name", "photo"]);
    },
    generateAuthToken() {
      const user = this;
      const access = "auth";
      const token = jwt
        .sign({ _id: user._id.toHexString(), access }, JWT_SECRET)
        .toString();
      return token;
    }
};

User.statics = {
  async findByCredentials(email, password) {
    const User = this;
    const user = await User.findOne({ email });
    if(!user){
      throw new AuthenticationError('must authenticate')
    }
    try {
      const result = await bcrypt.compareAsync(password, user.password);
      if(!result){
        throw new AuthenticationError('must authenticate')
      }
      return user;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

User.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {

    const encryptedPassword = await bcrypt.hashAsync(user.password);
    if(!encryptedPassword){
      throw Exception('Ocurred a problem when try to encrypt password');
    }

    user.password = encryptedPassword;
  };
   next();
});

export default mongooseConnection.model('user', User)
