import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import {errorHandler} from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signup =async(req, res,next)=>{
     const {username,email,password}=req.body;
    try {
        const hashedPassword=bcryptjs.hashSync(password,12);
        const newUser =new User({username, email, password:hashedPassword});
        await newUser.save();
   
        const {password:hashed,...user}=newUser._doc;

        //for removing the password without spreading it is not optimized as taking another call to the database
       //  const user =await User.find({_id:newUser._id}).select("-password")

       res.status(200).json(user)
    } catch (error) {
        next(error)        
    }

}
export const signin =async(req, res, next)=>{
    const {email,password}=req.body;
    console.log(email,password)

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found!'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));  
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res
      .cookie('token', token, { httpOnly: true })
      .status(200)
      .json(rest);
    
    
    } catch (error) {
        next(error)
    }

}
export const signout =(req, res)=>{

}
export const google =(req, res)=>{

}