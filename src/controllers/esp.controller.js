import { createAccessToken } from "../lib/jwt.js";
// import EspModel from "../models/esp.model.js";
import Esp from "../models/esp.model.js";

export const guardarDatos = async (req,res) => {

    const {ph,temperatura,solidosdisueltos,conductividad,producto,temperturaactivo} = req.body;
    try
    {
        //Nota: Los atributos del modelo (Esp) deben de nombrarse de la misma manera en la cual se nombra en las coleccion de la base de datos
        const newRegisterEsp = new Esp({
            ph,
            temperatura,
            solidosdisueltos,
            conductividad,
            producto,
            temperturaactivo
        });

        const registerEsp = await newRegisterEsp.save();

        res.status(200).send("carga de informacion correcta");

    }catch(err){
        res.status(500).send("Ocurrio un error al guardar el registro");
    }
};

export const obtenerDatos = async (req,res) => {
    try{
        const documentos = await Esp.find({}).limit(25);
        res.status(200).json({valor: documentos})
    }catch(err){
        res.status(500).send(err.message);
    }
};

