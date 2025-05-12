import * as userService from '../services/user.service.js';
import { validationResult } from 'express-validator';
import userModel from '../models/user.model.js';

export const createUserController = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() })
   }

   try {
      const user = await userService.createUser(req.body)
      const token = await user.generateToken();
      res.status(201).json({ user, token });
   } catch (error) {
      res.status(400).json({ status: "the error is geted", message: error.message });
   }
}

export const loginController = async (req, res) => {

   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Invalid Email Or Password" });
   }

   try {
      const { email, password } = req.body;
      console.log(email,password)
      const user = await userModel.findOne({ email }).select('+password');
      console.log(user)

      if (!user) {
         return res.status(400).json({message:"User Not Found",error:"Invalid userid or password"})
      }
      const isMatch=await user.isValidPassword(password);
      console.log(isMatch)
      if(!isMatch){
         return res.status(400).json({message:"user not found", error:"invlid userid or password"})
      }
      const token=await user.generateToken();
      res.status(200).json({user,token})

   } catch (err) {
      console.log(err)
      res.status(400).json(err.message)
   }

}

export const profileController=async (req,res)=>{
   
}