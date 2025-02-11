

const Booking = require('../models/BookingSchema');
const User = require('../models/userschema');
const Boat = require('../models/boatsSchema');
const carts = require('../models/cartSchema');

exports.booking = async (req, res) => {
  const { username, phnumber, email, Checkindate, Checkoutdate, boatid } = req.body;
  const phonenumber = req.params.phonenumber;
  const Email=req.params.email
  const id = req.params.id;

  try {
    console.log(email,Email);
    
    const user = await User.findOne({ username: email });
    const boat = await Boat.findOne({ id: id });

    if (!user) {
      return res.status(404).json('Please provide your Registered Email');
    }

    if (!boat) {
      return res.status(404).json('Boat not found');
    }

    const booking = await Booking.findOne({ email, boatid, Checkindate, Checkoutdate });
    console.log(booking);
    

    if (booking) {
      return res.status(401).json('Boat is already booked');
    }
    else{



    const notavlbledate = await Booking.findOne({ boatid });

    if (notavlbledate) {
      const overlappingBooking = await Booking.findOne({
        boatid,
        $or: [
          { Checkindate: { $lte: Checkoutdate }, Checkoutdate: { $gte: Checkindate } },
          { Checkindate: { $lte: Checkindate }, Checkoutdate: { $gte: Checkoutdate } }
        ]
      });

      if (overlappingBooking) {
        return res.status(401).json('Sorry, the boat is not available for the selected date range');
      }
    }

    const currentDate = new Date();
    const checkinDate = new Date(Checkindate);

    if (checkinDate <= currentDate) {
      return res.status(401).json('Please select a valid check-in date');
    }

    if (Checkoutdate <= Checkindate) {
      return res.status(401).json('Check-out date must be after the check-in date');
    }

    const newBooking = new Booking({
      username,
      phnumber,
      email,
      Checkindate,
      Checkoutdate,
      name: boat.name,
      location: boat.location,
      totalamount: boat.price,
      boatid
    });

    await newBooking.save();
    res.status(200).json('Booking successful');
    
  }
  } catch (error) {
    res.status(500).json(error);
  }
  
};



// exports.getbooking = async (req, res) => {
//   const phonenumber = req.params.phonenumber;


//   try {
//     const user = await User.findOne({ phonenumber: phonenumber });

//     if (!user) {
//       return res.status(404).json('Bookings not found');
//     }

   

// const boatbookings= await Booking.find({phnumber})
// res.status(200).json(boatbookings)




//   }catch(error){
//     res.status(404).json(error)
//   }
// }

exports.getBookings = async (req, res) => {
  const { email } = req.params;
console.log(email,'emaillllllllllllll');

  try {
    const user = await User.findOne({ username: email });
console.log(user);

    if (!user) {
      return res.status(404).json('User not found');
    }

    const bookings = await Booking.find({ email: email });
      console.log(bookings,'boooookings');
      
    if (bookings.length === 0) {
      return res.status(404).json('No bookings found for the user');
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
}



exports.cancelbooking = async (req, res) => {
  const { email, id: boatid, Checkindate, Checkoutdate } = req.params;

  console.log(email, boatid, Checkindate, Checkoutdate);

  try {
    // Attempt to delete the booking based on email, boatid, and dates
    const cancelbooking = await Booking.deleteOne({ 
      email: email, 
      boatid: boatid, 
      Checkindate: Checkindate, 
      Checkoutdate: Checkoutdate 
    });
    console.log(cancelbooking, 'cancelbooking result');

    // If a booking was deleted (deletedCount !== 0)
    if (cancelbooking.deletedCount != 0) {
      // Find all remaining bookings for the user with the given email
      const remainingboats = await Booking.find({ email: email });
      console.log(remainingboats, 'remaining bookings for user');
      
      // Return the list of remaining bookings
      res.status(200).json(remainingboats);
    } else {
      // If no booking was found to delete
      res.status(404).json('Booking not found');
    }
  } catch (error) {
    // Handle any errors and respond with a server error status
    console.error('Error while cancelling booking:', error);
    res.status(500).json('Server error');
  }
};
