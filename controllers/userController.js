const boats = require('../models/boatsSchema')
const users=require('../models/userschema')


const jwt=require('jsonwebtoken')

exports.register=async (req,res)=>{
    const{username,password,phonenumber}=req.body

    try{
        const user=await users.findOne({username})
        console.log(user);
        
        if(user){
           res.status(401).json('User already exist ')
        

        }
        else{
            const newUser=new users({username,password,phonenumber})
            console.log(newUser);
            
            await newUser.save()
            res.status(200).json('registered successfully')
        }
    }
    catch(error){
        res.status(401).json(error)
    }
    
}



exports.login=async(req,res)=>{
    console.log(req.body);
    
    const{password,username}=req.body

    try{
        const loginuser=await users.findOne({password,username})
                    console.log(loginuser);
                    
        if(loginuser){
            const token=jwt.sign({loginpassword:password},'keykey')
            console.log(token);
      return res.status(200).json({ message: 'Login successful ',status:200, token,username});
         
       

        }else{
            res.status(401).json({message:'Email or Password is Incorrect',status:401})
        }

        }
        catch(error){
            res.status(401).json(error)
        }
    
    }
  
exports.getUser=async(req,res)=>{
    console.log(req.body);
    console.log(req.params.email);
    
    const email = (req.params.username);
    console.log("UserName",email);
    
    try{
        const user=await users.findOne({username:email})
        console.log(user);
        if(user){
            return res.status(200).json(user.username)
            }
            else{
                res.status(401).json({message:'User not found',status:401})
                
            }
        }
            
                catch(error){
                        res.status(401).json(error)
                }
            }
    




 