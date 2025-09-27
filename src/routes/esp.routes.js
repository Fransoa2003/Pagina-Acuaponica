import { Router } from "express";
import { cargarDatos, pruebaEsp} from "../controllers/esp.controller.js";

const router = Router();

router.post('/enviar-datos',cargarDatos);
router.get('/mensaje',pruebaEsp);

export default router;