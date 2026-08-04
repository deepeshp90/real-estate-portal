import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'

import {verifyToken } from '../utils/verifyUser.js'
import Listing from './../models/listing.model.js';
// import { useRef } from 'react';

export const test = (req, res) => {
    res.json({ message: "API is working properly" });
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) 
        return next(errorHandler(403, "You can update only your account!"));

    try {   
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, { new: true })

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json({
            success: true,
            message: "User has been updated successfully",
            user: rest
        })

    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(403, "You can delete only your account!"));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('acces_token')
        res.status(200).json({
            success: true,
            message: "User has been deleted successfully"
        })

    }catch (error) {
        next(error)
    }
}

export const getUserListings = async(req,res,next)=>{
if(req.user.id === req.params.id){
    try {
        const listings = await Listing.find({userRef:req.params.id});
        res.status(200).json(listings);
    } catch (error) {
        next(error)
        
    }
}else{
    return next(errorHandler(401,'You can only view your own Listings'));
}
};

export const getUser = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.params.id);
  
    if (!user) return next(errorHandler(404, 'User not found!'));
  
    const { password: pass, ...rest } = user._doc;
  
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};