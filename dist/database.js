"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://127.0.0.1:27017/adidas', {})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));
exports.default = mongoose_1.default;
//# sourceMappingURL=database.js.map