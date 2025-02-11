const Reviews=require('../models/reviewSchema')


exports.postReview=async(req,res)=>{
    const {name,rating,review,BoatId,time}=req.body
    try{
        

        const newReview=await Reviews ({name,rating,review,BoatId,time})
        await newReview.save()
        res.status(201).json({message:"Review posted successfully",newReview})
        }catch(err)
        {
                    console.log(err);
                    
            return res.status(500).json('Server Error')
    }
}
exports.getReviews=async(req,res)=>{
    const {BoatId}=req.params
    try{
        const reviews=await Reviews.find({BoatId})
        console.log(reviews);
        if(reviews){
            return res.status(200).json(reviews)
        }
        else{
            return res.status(404).json('No reviews found')
        }
        

    }
    catch(err){
        res.status(401).json(err)
    }
}
    exports.deleteReview=async(req,res)=>{
        const {id}=req.params
        try{
            const review=await Reviews.findByIdAndDelete(id)
            if(review){
                return res.status(200).json('Review deleted successfully')
                }
                else{
                    return res.status(404).json('Review not found')
                    }
                    }
                    catch(err){
                        res.status(401).json(err)
                    }
    }
    

