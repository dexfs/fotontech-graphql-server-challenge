const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { mongooseConnection } = require('./../../config/mongooseConnection')
const Schema = mongoose.Schema;
const Product = new Schema({
    name: {
      type: String,
      require: true,
      trim: true
    },
    description: {
      type: String,
      require: true,
      trim: true
    },
    quantity: {
        type: Number,
        required: true
    },
    value: {
      type: Number,
      required: true
    }
  });
Product.plugin(mongoosePaginate);
Product.virtual('id').get( function() { return this._id.toString()})

export default mongooseConnection.model('product', Product)
