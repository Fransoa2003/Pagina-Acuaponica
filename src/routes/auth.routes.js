import { Router } from "express";
import {register,login,logout,profile} from '../controllers/auth.controller.js';
import {authRequired} from '../middleware/validateToken.js';

const router = Router();

router.post('/registro',register);
router.post('/login',login);
router.post('/logout',logout);

// router.post('logout',authRequired,logout);

router.get('/perfil',authRequired,profile);

export default router;