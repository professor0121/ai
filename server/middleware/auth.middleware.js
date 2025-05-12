// import jwt from 'jsonwebtoken';
// import { validationResult } from 'express-validator'
// // import redisClient  from '../services/radis.service';


// export const authUser = async (req, res,next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ message: "some thing went wrong", error: errors })
//     }
//     try {
//         const token = req.cookies.token || req.headers.authorization.split(' ')[1];
//         if (!token) {
//             return res.status(400).json({ message: "token not found" })
//         }

//         const decode = jwt.verify(token, process.env.JWT_SECRET)
//         req.user=decode;
//         next();

//     } catch (err) {
//         console.log(err)
//         return res.status(400).json({ message: err });
//     }

// }

import jwt from 'jsonwebtoken';
import redisClient from '../services/radis.service.js'; // double-check the file name spelling!
import dotenv from 'dotenv';
dotenv.config();

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const isBlocked = await redisClient.get(token);
    if (isBlocked) {
      res.cokkie('token', '')
      return res.status(401).json({ error: "Token is blocked" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token", error: err.message });
  }
};
