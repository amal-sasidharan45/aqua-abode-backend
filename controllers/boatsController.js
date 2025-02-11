// const Houseboat=require ('../models/boatsSchema')



// exports.getallboats=async (req,res)=>{
//     try{
//         const allboats=await Houseboat.find()
//         res.status(200).json(allboats)
//     }
//     catch(error){
//         res.status(401).json(error)
//     }
// }
const boats = require('../models/boatsSchema');
const users = require('../models/userschema');

exports.getallboats = async (req, res) => {
  try {
    const allboats = await boats.find();
    res.status(200).json(allboats);
  } catch (error) {
    res.status(401).json(error);
  }
};


exports.viewBoat=async (req,res)=>{

  const id=req.params.id

  try{
    const boat=await boats.findOne({id})
    if(boat){
      res.status(200).json(boat)
    }
    else{
      res.status(404).json('item not found')
    }
  }

  catch(error){
    res.status(401).json(error)
  }
}




// exports.addtocart=async(req,res)=>{
//   const{id,name,location,price,images,description}=req.body


// try{
//   const boat=await boats.findOne({id})
//   if(product){
//     product.quantity+=1
//     // //update grand total in mongodb
//     product.grandtotal=product.price*product.quantity

//     //to save changes mongdb
//     product.save()
//     //send response to the client
//     res.status(200).json('product added to the cart successfully')
//       boat.save()
//       res.status(200).json('Boat added to cart successfully')

//   }
//   else{
//       const newBoats=new boats({id,name,location,price,images,description})


//       await newBoats.save()
//       res.status(200).json('boat added to cart')
//   }
// }
// catch(error){
//   res.status(401).json(error)
// }
// }

// exports.addtocart = async (req, res) => {
//   const { id, name, location, price, images, description } = req.body;
//   const phoneNumber =req.params.phoneNumber
//   try {
//     const boat = await boats.findOne({ id });
//     const user=await users.findOne({phonenumber})


//     if (boat,user) {
//       boat.quantity += 1;
//       boat.grandtotal = boat.price * boat.quantity;

//       await boat.save();
//       res.status(200).json('Boat added to cart successfully');
//     } else {
//       const newBoat = new boats({ id, name, location, price, images, description });

//       await newBoat.save();
//       res.status(200).json('Boat added to cart successfully');
//      }
//    }
//    catch (error) {
//     res.status(401).json(error);
//   }
// };




// exports.getcartitem=async(req,res)=>{
//   try{
//     const phonenumber = req.params.phonenumber; 
//     const allcartItem=await boats.find({phonenumber})
//     res.status(200).json(allcartItem)
//   }
//   catch(error){
//     res.status(401).json(error)
//   }
// }

// exports.getCartItem = async (req, res) => {
//   try {
//     const phonenumber = req.params.phonenumber; // Assuming phoneNumber is passed as a parameter in the route
//     const cartItems = await boats.find({ phonenumber }); // Assuming your model name is "boats" and phoneNumber field is used to identify the account

//     res.status(200).json(cartItems);
//   } catch (error) {
//     res.status(401).json(error);
//   }
// };

// exports.getCartItem = async (req, res) => {
//   try {
//     const phoneNumber = req.params.phno; // Assuming phoneNumber is passed as a parameter in the route
//     const cartItems = await boats.find({ phonenumber: phoneNumber }); // Assuming your model name is "boats" and phonenumber field is used to identify the account

//     res.status(200).json(cartItems);
//   } catch (error) {
//     res.status(401).json(error);
//   }
// };


// exports.getCartItem = async (req, res) => {
//   try {
//     // const phonenumber = req.params.phonenumber; // Assuming phoneNumber is passed as a parameter in the route
//     const cartItems = await boats.find({ phonenumber });

//     res.status(200).json(cartItems);
//   } catch (error) {
//     res.status(401).json(error);
//   }
// };
