const express = require('express');
const userController = require('../controllers/userController');
const boatsController=require('../controllers/boatsController');
const cartController=require('../controllers/cartcontroller')
const bookingController=require('../controllers/bookingController')
const reviewController=require('../controllers/reviewController')

const router = new express.Router();
const jwt = require('jsonwebtoken');
const carts = require('../models/cartSchema');

const appMiddleware = (req, res, next) => {
  next();
  console.log('application specific middleware');
};

const server = express(); 

server.use(appMiddleware);

 jwtMiddleware = (req, res, next) => {
  const token = req.headers['verify-token'];
  console.log(token);

  try {
    const data = jwt.verify(token, 'keykey');
    console.log(data);
    next();
  } catch {
    res.status(401).json({ message: 'please login' });
  }
  console.log('router specific middleware');
};

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/getUser/:username',userController.getUser)

router.get('/allboats',boatsController.getallboats);
router.get('/boats/view-boat/:id',boatsController.viewBoat)

router.post('/add-to-cart/:email', cartController.addToCart);
router.post('/postReview',reviewController.postReview)
router.get('/get-cart/:email',jwtMiddleware,cartController.getCartitems)

router.delete('/deleteitem/:id',jwtMiddleware, cartController.deletecartItem)
router.delete('/deleteReview/:id',reviewController.deleteReview)
router.post('/booking/:email/:id', bookingController.booking);

router.get('/getbooking/:email',jwtMiddleware, bookingController.getBookings)
router.delete('/bookings/remove-cancel/:email/:id/:Checkindate/:Checkoutdate', bookingController.cancelbooking);

router.get('/getReviews/:BoatId',reviewController.getReviews)


server.use(router); 

module.exports = server;
