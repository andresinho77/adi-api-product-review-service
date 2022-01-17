"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//Product Controller
const review_controller_1 = require("../controllers/review.controller");
const verifyToken_1 = require("../libs/verifyToken");
//Define the routes for that API
router.route('/reviews')
    .post(verifyToken_1.TokenValidation, review_controller_1.createReview)
    .get(review_controller_1.getReviews);
router.route('/reviews/list')
    .get(review_controller_1.listReviews);
router.route('/reviews/:id')
    .get(review_controller_1.getReview)
    .delete(verifyToken_1.TokenValidation, review_controller_1.deleteReview)
    .put(verifyToken_1.TokenValidation, review_controller_1.updateReview);
exports.default = router;
//# sourceMappingURL=index.js.map