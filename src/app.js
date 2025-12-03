import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import espRoutes from './routes/esp.routes.js';
import emailRoutes from './routes/email.routes.js';
import { createServer } from 'vite';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//Para habilitar comunicacion crusadas de dominios origenes y destino sin emplear el modulo cors
// app.use((req,res,next) => {
//     res.append('Access-Control-Allow-Origin', ['http://localhost:5173']);
//     res.append('Access-Control-Allow-Methods', 'GET');
//     // res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     // res.append('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

//HABILITAMOS LA ENTRADA DE ORIGEN DE PETICION A LA DIRECCION DEL SERVIDOR
app.use(cors({
    origin: ['http://162.16.15.91:5173','http://localhost:5173'],
    // origin: ['http://sora-production-8887.up.railway.app:5173'],
    origin: ['http://10.0.2.27:5173'],
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}));

app.use("/api",authRoutes);
app.use("/api/esp",espRoutes);
app.use("/api/email", emailRoutes);
export default app;