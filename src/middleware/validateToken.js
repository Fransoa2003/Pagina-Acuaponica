import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

//Solo funciona para el tipo de ruta GET
export const authRequired = (req,res,next) => {

    const {token} = req.cookies; //cookies es propio de cookie-parser
    if(!token) return res.status(401).send("No existe token, no autorizado");

    jwt.verify(token,TOKEN_SECRET,(err,decoded) => {
        if(err) return res.status(403).send("Token invalido");
        req.user = decoded;
        next();
    });
};