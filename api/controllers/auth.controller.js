import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from './../utils/error.js';
import jwt from "jsonwebtoken";



export const signup = async (req, res,next) => {
    // console.log(req.body);
    const {username,email,password} = req.body;
    const  hashedPassword =  bcrypt.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPassword});
    try{
      await newUser.save()
     res.status(201).json({message:"user created successfully"})
    }catch(error){
     next(error);
    }
    

    
};

export const signin = async (req, res,next) => {
    const {email,password} = req.body;

try{
    const validUser = await User.findOne({email:email});
    if(!validUser){
        return  next(errorHandler(404,"user not found"));

    }
    const validPassword = bcrypt.compareSync(password,validUser.password);
    if(!validPassword){
        return next(errorHandler(400,"wrong credentials"));
    }

    const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
    const {password:pass,...rest} = validUser._doc;
    res.cookie("access_token",token,{
        httpOnly:true,
        sameSite: 'lax',
    }).status(200).json(rest);


}catch(error){
    next(error);
}
}


export const google = async (req,res,next) => {
    try
    {
        
        const user = await User.findOne({email :req.body.email})
        if(user){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password:pass,...rest} = user._doc;
            res.cookie("access_token",token,{
                httpOnly:true,
                sameSite: 'lax',
            }).status(200).json(rest);
        }else{
           
            const generatedPassword = Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword,10);
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo
            });
            await newUser.save();
            const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const {password:pass,...rest} = newUser._doc;
            res.cookie("access_token",token,{
                httpOnly:true,
                sameSite: 'lax',
            }).status(200).json(rest);
        }

    }catch (error) {
        next(error);
    }   
}

export  const signout = async (req,res,next)=>{
    try {
        res.clearCookie('access_token');
        res.status(200).json("User has been logged Out ! ")
    } catch (error) {
        next(error)
        
    }
    

}
