import { createAccessToken } from "../lib/jwt.js";
import userModel from "../models/user.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req,res) => {
    const {username,email,password,codigoAcuaponico} = req.body;
    try{

        //Encriptamos la password

        const passwordHash = await bcrypt.hash(password,10);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            codigoAcuaponico
        });

        const userSaved = await newUser.save();

        const token = await createAccessToken({id:userSaved._id});
        res.cookie('token',token);

        res.status(200).send("Usuario registrado");

        // res.status(200).json({
        //     id: userSaved._id,
        //     username: userSaved.username,
        //     email: userSaved.email,
        //     createAt: userSaved.createdAt,
        //     updateAt: userSaved.updatedAt
        // });
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export const login = async (req,res) => {
    const {email,password} = req.body;

    try{
        const userFound = await userModel.findOne({email});
        if(!userFound) return res.status(400).send("Usuario no encontrado");

        const isMatch = await bcrypt.compare(password,userFound.password);
        if(!isMatch) return res.status(400).send("Credenciales incorrectas");

        const token = await createAccessToken({id:userFound._id});

        res.cookie('token',token);

        res.send("Inicio de sesion correcto");

        //consultado el usuario, comparamos las credenciales
    }catch(error){
        res.status(500).json({message: error.message});
    }
}