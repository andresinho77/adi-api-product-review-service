"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        min: 4,
        uppercase: true
    },
    avgReviewScore: {
        type: Number,
        required: true,
    },
    numReviews: {
        type: String,
        required: true
    }
});
exports.default = (0, mongoose_1.model)('Review', reviewSchema);
//# sourceMappingURL=Review.js.map