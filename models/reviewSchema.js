const mongoose=require('mongoose')
const reviewSchema=new mongoose.Schema({
    name:{type:String,required:true},
    rating:{type:Number,required:false},
    review:{type:String,required:true},
    BoatId:{type:Number,required:true},
    time:{type:String,required:true}
})

const Reviews=mongoose.model('reviews',reviewSchema)
module.exports=Reviews