import User from "../models/user.model.js";

export const register = async (req,res) => {
    const {username,email,password,codigoAcuaponico} = req.body;
    try{
        const newUser = new User({
            username,
            email,
            password,
            codigoAcuaponico
        });

        const userSaved = await newUser.save();
        // if()
        res.status(200).json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt
        });
    }catch(err){
        res.status(500).json({message: error.message});
    }
}