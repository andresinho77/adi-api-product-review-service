import {Router} from "express";
const router = Router();

//Product Controller
import {createReview, updateReview, getReview, getReviews, deleteReview, listReviews } from '../controllers/review.controller'
import {TokenValidation} from '../libs/verifyToken'

//Define the routes for that API
router.route('/reviews')
    .post(TokenValidation, createReview)
    .get(getReviews)

    router.route('/reviews/list')
    .get(listReviews)

router.route('/reviews/:id')
    .get(getReview)
    .delete(TokenValidation, deleteReview)
    .put(TokenValidation, updateReview)

    
export default router;