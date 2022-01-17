import {Request, Response} from "express";
import Review from "../models/Review";

export async function getReviews(req:Request , res:Response) {
 
    
    const reviewGroup = await Review.aggregate([
        {
            $group:{_id:'$id',numReviews:{$count:{}},avgReviewScoreNew :{$avg: '$avgReviewScore'}}
        }
    ]);
     
    return res.json(reviewGroup);   
}
export async function listReviews(req:Request , res:Response) {
    const review = await Review.find();
    console.log(review);
    return res.json(review); 
}
export async function deleteReview(req:Request , res:Response) {
    const id = req.params.id;
    const review = await Review.deleteOne({"id":id});
    return res.json({ message:'The Review: '+ id +' has been deleted'});
}

export async function updateReview(req:Request , res:Response){
    const id = req.params.id;
    const {avgReviewScore, numReviews} = req.body;
    
    const updatedReview = await Review.updateOne({"id":id},{
        avgReviewScore , numReviews
    });
    return res.json({ message:'The Review: '+id+' has been updated'});
}
export async function getReview(req:Request , res:Response) {
    const id = req.params.id;

    const review = await Review.aggregate([
        { $match: {id:id}},
        { $group: {_id:id,numReviews:{$count:{}},avgReviewScoreNew :{$avg: '$avgReviewScore'}}}
    ])
    return res.json(review);
}

export async function createReview(req:Request, res:Response){
    const {id, avgReviewScore, numReviews} = req.body;

    const newReview = {
        id: id,
        avgReviewScore: avgReviewScore,
        numReviews: numReviews
    };

    const review = new Review(newReview);
    await review.save();
    console.log(review);
    return res.json({
        message:'Review successfully stored',
        review
    });
}





