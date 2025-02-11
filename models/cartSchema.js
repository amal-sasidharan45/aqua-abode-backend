const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
 
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: [
    {
      url: {
        type: String,
        required: true
      }
    }
  ],
  description: {
    type: String,
    required: true
  },
  email:{
    type:String,
    required:true
  },
  

});

const carts = mongoose.model('carts', cartSchema);

module.exports = carts;
