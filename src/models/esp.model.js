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
    }
},{
    timestamps:true
});

export default mongoose.model("Esp",EspSchema);