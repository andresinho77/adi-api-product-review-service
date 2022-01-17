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
exports.profile = exports.signin = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    //Create user based on an Interface
    const user = new User_1.default({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    //Encrypt the password once password is received as a string
    user.password = yield user.encryptPassword(user.password);
    //Save the User in Mongo
    const savedUser = yield user.save();
    //Token
    const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET || 'TOKEN_TEST');
    //Console Logs 
    console.log(savedUser);
    res.header('auth_token', token).json(savedUser);
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Validate if email exists or not
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json('Email or password is wrong');
    //Validate password
    const login = yield user.validatePassword(req.body.password);
    if (!login)
        return res.status(400).json('Invalid Password');
    //Create the JWT to send it back thru api
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'TOKEN_TEST', {
        expiresIn: 60 * 60 * 24
    });
    res.header('auth-token', token).json(user);
});
exports.signin = signin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = "You are authenticated using JWT";
    res.send(msg).json();
    console.log("You are authenticated using JWT");
});
exports.profile = profile;
//# sourceMappingURL=auth.controller.js.map