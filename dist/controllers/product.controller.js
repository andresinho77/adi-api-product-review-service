"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReview = exports.getReview = exports.updateReview = exports.deleteReview = exports.listReviews = exports.getReviews = void 0;
const Review_1 = __importDefault(require("../models/Review"));
function getReviews(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const reviewGroup = yield Review_1.default.aggregate([
            {
                $group: { _id: '$id', numReviews: { $count: {} }, avgReviewScoreNew: { $avg: '$avgReviewScore' } }
            }
        ]);
        return res.json(reviewGroup);
    });
}
exports.getReviews = getReviews;
function listReviews(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const review = yield Review_1.default.find();
        return res.json(Review_1.default);
    });
}
exports.listReviews = listReviews;
function deleteReview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const review = yield Review_1.default.deleteOne({ "id": id });
        return res.json({ message: 'The Review: ' + id + ' has been deleted' });
    });
}
exports.deleteReview = deleteReview;
function updateReview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const { avgReviewScore, numReviews } = req.body;
        const updatedReview = yield Review_1.default.updateOne({ "id": id }, {
            avgReviewScore, numReviews
        });
        return res.json({ message: 'The Review: ' + id + ' has been updated' });
    });
}
exports.updateReview = updateReview;
function getReview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const review = yield Review_1.default.aggregate([
            { $match: { id: id } },
            { $group: { _id: id, numReviews: { $count: {} }, avgReviewScoreNew: { $avg: '$avgReviewScore' } } }
        ]);
        return res.json(review);
    });
}
exports.getReview = getReview;
function createReview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, avgReviewScore, numReviews } = req.body;
        const newReview = {
            id: id,
            avgReviewScore: avgReviewScore,
            numReviews: numReviews
        };
        const review = new Review_1.default(newReview);
        yield review.save();
        console.log(review);
        return res.json({
            message: 'Review successfully stored',
            review
        });
    });
}
exports.createReview = createReview;
//# sourceMappingURL=product.controller.js.map