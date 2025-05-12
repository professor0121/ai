import * as projectSevice from '../services/project.service.js'
import { validationResult } from 'express-validator';
import userModel from '../models/user.model.js'

export const createProject = async (req, res) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    try {
        const { name } = req.body;
        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const userId = await loggedInUser._id;

        const newProject = await projectSevice.createProject({ name, userId })
        res.status(201).json(newProject);
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }

}

export const getAllProject = async (req, res) => {
    try {

        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const getAllUserProjects = await projectSevice.getAllProjectByUserId({ userId: loggedInUser._id })
        return res.status(200).json({ projects: getAllUserProjects });
    } catch (error) {
        console.log(error);
        res.status(404).json({ err: error.message })
    }
}

export const addUserToProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    try {
        

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}