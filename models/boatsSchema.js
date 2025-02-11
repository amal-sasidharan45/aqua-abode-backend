// const mongoose = require('mongoose');

// const boatSchema = new mongoose.Schema({
//   id: {
//     type: Number,
//     required: true,
//     unique: true
//   },
//   title: {
//     type: String,
//     required: true
//   },
//   location: {
//     type: String,
//     required: true
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   images: [
//     {
//       url: {
//         type: String,
//         required: true
//       }
//     }
//   ],
//   description: {
//     type: String,
//     required: true
//   }
// });

// const boats = new mongoose.model('boats', boatSchema);

// module.exports = boats;

const mongoose = require('mongoose');

const boatSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
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
  }
});

const boats = mongoose.model('boats', boatSchema);

module.exports = boats;
