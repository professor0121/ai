import * as projectSevice from '../services/project.service.js'
import { validationResult } from 'express-validator';
import userModel from '../models/user.model.js'

export const createProject = async (req, res) => {
    const errors=validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }

    try{
        const {name}=req.body;
        const loggedInUser=await userModel.findOne({email:req.user.email});
        const userId =await loggedInUser._id;

        const newProject =await projectSevice.createProject({name,userId})
        res.status(201).json(newProject);
    }catch(err){
        console.log(err)
        return res.status(400).json({message:err.message})
    }

}