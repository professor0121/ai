import { Router } from "express";
import {body} from 'express-validator';
import * as projectController from '../controllers/project.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js'

const router=Router();

router.post('/create',
    authMiddleware.authUser,
    body('name').isString().withMessage("Name is required"),
    projectController.createProject
)

router.get('/all',
    authMiddleware.authUser,
    projectController.getAllProject
)

router.put('/add-user',
    authMiddleware.authUser,
    body('projectId').isString().withMessage("Project id must be a String"),
    body('users').isArray({min:1}).withMessage("Users must be an array of String").bail()
    .custom((users)=>users.every(user=>typeof user==="string")).withMessage("Each user must be a string"),
    projectController.addUserToProject
)

router.get('/get-project/:projectId',
    authMiddleware.authUser,
    projectController.getProjectById
)

export default router;