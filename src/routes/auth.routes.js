import express from 'express'
import { body } from 'express-validator'
import authControllers from '../controllers/auth.controllers.js'
import validator from '../middleware/validation.middleware'

const router = express.Router();

router.post('/login', 
body("email").isEmail().withMessage("is not email format!"),
body("password").isLength({ min:8 }).withMessage("min length password is 8!"),
validator, [
    authControllers.login
]);

router.post('/register', 
body("name").notEmpty().withMessage("name is required!"),
body("password").isLength({ min:8 }).withMessage("min length password is 8!"),
body("email").isEmail().withMessage("is not email format!"),
body("gender").notEmpty().withMessage("gender is required!"),
body("location").isObject().withMessage("min length password is 8!"),
validator, [
    authControllers.register
]);

export default router
