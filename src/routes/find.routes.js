import express from 'express'
import findControllers from '../controllers/find.controllers';
import { verifyJwt } from '../middleware/jwt.middleware'
const router = express.Router();

router.post('/around', verifyJwt, [
    findControllers.around
]);

export default router
