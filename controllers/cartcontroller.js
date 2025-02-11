
const carts=require('../models/cartSchema')
const users=require('../models/userschema')



exports.addToCart = async (req, res) => {
  // Destructure the body and email from req.params
  const { id, name, location, price, images, description } = req.body;
  const { email } = req.params;

  try {
    // Find user by email
    const user = await users.findOne({ username:email });
    console.log(user);

    // If user doesn't exist, return 404
    if (!user) {
      return res.status(404).json('User not found');
    }

    console.log(id, email, "id and email");

    // Check if item already exists in the cart for this user
    const cartItem = await carts.findOne({ id, email });
    console.log(cartItem, "cart");

    // If cart item already exists, return 200 with a message
    if (cartItem) {
      return res.status(200).json('Boat already exists in cart');
    } 
    
    // Create a new cart item
    const newCartItem = new carts({ id, name, location, price, images, description, email });
    console.log(newCartItem);

    // Save the new cart item
    await newCartItem.save();
    
    // Return success response
    return res.status(200).json('Boat added to cart');
    
  } catch (error) {
    // Handle any errors and send a 500 status code
    console.error(error);
    return res.status(500).json('An error occurred while adding the boat to the cart');
  }
};



  

  exports.getCartitems = async (req,res)=>{
    const email=req.params.email
    console.log(email);
    

    try{
      const user=await users.findOne({username:email})

      if(!user){
        return res.status(401).json('user not found')
      }
        console.log(email,"email");
        
      const cartitems= await carts.find({email:email})
        console.log('cart',cartitems);
        
      res.status(200).json(cartitems);
    }
    catch(error){
      res.status(401).json(error)
    }
  }




  exports.deletecartItem=async (req,res)=>{
    const {id}=req.params

    try{
      const removeBoat=await carts.deleteOne({id})
      if(removeBoat.deletedCount!=0){
        const remainingboats=await carts.find()
        res.status(200).json({
          message:'Boat deleted from cart',
        })
      }
      else{
        res.status(401).json('item not found')
      }
    }
    catch(error){
      res.status(401).json(error)
    }
  }