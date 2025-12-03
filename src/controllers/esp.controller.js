import { createAccessToken } from "../lib/jwt.js";
// import EspModel from "../models/esp.model.js";
import Esp from "../models/esp.model.js";

export const guardarDatos = async (req,res) => {

    const {ph,temperatura,solidosdisueltos,conductividad,producto,calentadoractivo} = req.body;
    try
    {
        //Nota: Los atributos del modelo (Esp) deben de nombrarse de la misma manera en la cual se nombra en las coleccion de la base de datos
        const newRegisterEsp = new Esp({
            ph,
            temperatura,
            solidosdisueltos,
            conductividad,
            producto,
            calentadoractivo
        });

        const registerEsp = await newRegisterEsp.save();

        res.status(200).send("carga de informacion correcta");

    }catch(err){
        res.status(500).send("Ocurrio un error al guardar el registro");
    }
};

export const obtenerDatos = async (req,res) => {
    try{
        //configuramos la variable res para evitar que cargue la cache en la memoria del chrome. Sin embargo coloca mayor carga de
        //datos al servidor.
        res.set({
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Surrogate-Control': 'no-store'
        });
        const documentos = await Esp.find({}).sort({createdAt: -1}).limit(1);
        console.log(documentos);
        res.status(200).json({valor: documentos})
    }catch(err){
        res.status(500).send(err.message);
    }
};

