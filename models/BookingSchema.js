const mongoose=require('mongoose')


const bookingschema=new mongoose.Schema({
    
    username:{
        type:String,
        required:true,

    },
    phnumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    Checkindate:{
        type:String,
        required:true
    },
    Checkoutdate:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true

    },
    location:{
        type:String,
        required:true

    },
    totalamount:{
        type:Number,
        required:true

    },
    boatid:{
        type:Number,
        required:true
    }

})


const booking=mongoose.model('booking',bookingschema);

module.exports=booking;