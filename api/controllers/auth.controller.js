import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

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
export const signin =(req, res)=>{

}
export const signout =(req, res)=>{

}
export const google =(req, res)=>{

}