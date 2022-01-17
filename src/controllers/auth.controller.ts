import { Request, response, Response } from 'express';
import User, {IUser} from '../models/User';
import jwt from 'jsonwebtoken';


export const signup = async (req: Request, res: Response)=>{
    console.log(req.body);
    //Create user based on an Interface
    const user: IUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    //Encrypt the password once password is received as a string
    user.password = await user.encryptPassword(user.password);
    
    //Save the User in Mongo
    const savedUser = await user.save();
    //Token
    const token:string = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET || 'TOKEN_TEST');
    //Console Logs 
    console.log(savedUser);
    res.header('auth_token',token).json(savedUser);
};

export const signin = async (req: Request, res: Response)=>{
  
  //Validate if email exists or not
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).json('Email or password is wrong');
  
  //Validate password
  const login : boolean = await user.validatePassword(req.body.password);
  if(!login) return res.status(400).json('Invalid Password');

  //Create the JWT to send it back thru api
  const token:string = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET || 'TOKEN_TEST',{
      expiresIn : 60 * 60 * 24
  });
  res.header('auth-token', token).json(user);
};
export const profile = async (req: Request, res: Response)=>{
    const msg = "You are authenticated using JWT";
    res.send(msg).json();
    console.log("You are authenticated using JWT");
}