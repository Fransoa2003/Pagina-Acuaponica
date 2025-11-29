import { Router } from "express";
import { guardarDatos, obtenerDatos} from "../controllers/esp.controller.js";

const router = Router();

router.post('/enviar-datos',guardarDatos);
router.get('/traer-datos',obtenerDatos);
// router.get('/consultar-ip',obtenerIP);

export default router;