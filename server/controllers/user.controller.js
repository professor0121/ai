import * as userService from '../services/user.service.js';
import { validationResult } from 'express-validator';
import userModel from '../models/user.model.js';
import redisClient from '../services/radis.service.js';

export const createUserController = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() })
   }

   try {
      const user = await userService.createUser(req.body)
      const token = await user.generateToken();
      delete user._doc.password;
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
      console.log(email, password)
      const user = await userModel.findOne({ email }).select('+password');
      console.log(user)

      if (!user) {
         return res.status(400).json({ message: "User Not Found", error: "Invalid userid or password" })
      }
      const isMatch = await user.isValidPassword(password);
      console.log(isMatch)
      if (!isMatch) {
         return res.status(400).json({ message: "user not found", error: "invlid userid or password" })
      }
      const token = await user.generateToken();
      delete user._doc.password;

      res.status(200).json({ user, token })

   } catch (err) {
      console.log(err)
      res.status(400).json(err.message)
   }

}

export const profileController = async (req, res) => {
   console.log("req", req.user)
   return res.status(200).json(req.user)
}

export const logoutConctoller = async (req, res) => {
   try {
      const token = req.cookies.token || req.headers.authorization.split(' ')[1];
      redisClient.set(token, 'logout', 'EX', 60 * 60 * 24)
      res.status(200).json({ message: "logged out successfully" })

   } catch (err) {
      return res.status(400).json(err)
   }
}

export const getAllUsersController = async (req, res) => {

   try {
      const loggedInUser = await userModel.findOne({ email: req.user.email });

      const allUsers = await userService.getAllUser({userId:loggedInUser._id});

      return res.status(200).json(allUsers)

   } catch (error) {
      return res.status(400).json({ message: error.message })
   }
}