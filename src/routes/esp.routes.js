import { Router } from "express";
import { guardarDatos, obtenerDatos} from "../controllers/esp.controller.js";

const router = Router();

router.post('/enviar-datos',guardarDatos);
router.get('/traer-datos',obtenerDatos);

export default router;