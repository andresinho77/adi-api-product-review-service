import { Schema ,  model, Document } from "mongoose";


export interface IReview extends Document{
    id : string;
    avgReviewScore : number;
    numReviews: string;
    countReviews(): number;
    avgReviewScoreProd(): number;
}

const reviewSchema = new Schema({
    id:{
        type: String,
        required: true,
        min:4,
        uppercase: true
    },
    avgReviewScore:{
        type: Number,
        required: true,
    },
    numReviews:{
        type: String,
        required: true
    }
});

export default model<IReview>('Review', reviewSchema);
