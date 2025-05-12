import { Router } from 'express';
import { body } from 'express-validator';
import * as userController from '../controllers/user.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register',
    body('email').isEmail().withMessage('email must be a valid email address'),
    body('password').isLength({ min: 3 }).withMessage('password must be atleast length of 3'),
    userController.createUserController
);

router.post('/login',
    body('email').isEmail().withMessage('email must be a valid email address'),
    body('password').isLength({ min: 3 }).withMessage('password must be atleast length of 3'),
    userController.loginController
)

router.get('/profile',
    authMiddleware.authUser,
    userController.profileController
);

router.get('/logout',
    authMiddleware.authUser,
    userController.logoutConctoller
)

export default router;