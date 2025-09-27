import { createAccessToken } from "../lib/jwt.js";
// import EspModel from "../models/esp.model.js";
import Esp from "../models/esp.model.js";

export const cargarDatos = async (req,res) => {

    const {ph,temperatura,solidosdisueltos,conductividad,producto} = req.body;

    try
    {
        const newRegisterEsp = new Esp({
            ph,
            temperatura,
            solidosdisueltos,
            conductividad,
            producto
        });

        const registerEsp = await newRegisterEsp.save();

        res.status(200).send("carga de informacion correcta");

    }catch(err){
        res.status(500).send("Ocurrio un error al guardar el registro");
    }
};

export const pruebaEsp = async (req,res) => {
    res.status(200).send("hecho");
};
