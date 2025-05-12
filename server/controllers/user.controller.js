// import * as userService from '../services/user.service.js';
import createUser from '../services/user.service.js'
import { validationResult } from 'express-validator';

export const createUserController=async (req,res)=>{
     const errors=validationResult(req);
    // console.log(userService.createUser())
     if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
     }

     try{
        const {email,password}=req.body;
        console.log(email,password)
        const user=await createUser(email,password)
        const token=await user.generateToken();
        res.status(201).json({user,token});
     }catch(error){
        res.status(400).json({status:"the error is geted",message:error.message});
     }
}