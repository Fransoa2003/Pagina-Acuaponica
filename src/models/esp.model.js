import mongoose from "mongoose";

const EspSchema = new mongoose.Schema({
    ph: {
        type: Number,
        required: true
    },
    temperatura:{
        type: Number,
        required: true
    },
    solidosdisueltos:{
        type: Number,
        required: true
    },
    conductividad:{
        type: Number,
        required: true
    },
    producto:{
        type: String,
        required: true
    },
    calentadoractivo:{
        type: Boolean,
        required: true
    }
},{
    timestamps:true
});

//Primer argumento: nombre del modelo (Mongoose lo pluraliza para la colección)
//Segundo: el esquema
//(opcional) Tercer argumento: nombre exacto de la colección
//export const Sensor = mongoose.model("Sensor", sensorSchema, "lecturas_sensores");

export default mongoose.model("Esp",EspSchema);