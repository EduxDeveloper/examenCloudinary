import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";
import patientModel from "../models/patientModel.js"

const loginController = {};

loginController.login = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const patientFound = await patientModel.findOne({email});

        if(!patientFound){
            console.log("Error usuario no existe")
            return res.status(404).json({message: "User Not found"});
        }

        if(patientFound.timeOut && patientFound.timeOut > Date.now()){
            return res.status(403).json({message: "Usuario bloqueado"});
        }

        const isMatch = await bcryptjs.compare(password, patientFound.password);
        if(!isMatch){
            patientFound.loginAttemps = (patientFound.loginAttemps || 0) + 1;
        
            if(patientFound.loginAttemps >=5){
                patientFound.timeOut = Date.now() + 5 * 60 * 1000;
                patientFound.loginAttemps = 0;

                await patientFound.save();

                return res.status(403).json({message: "Cuenta bloqueada"})
            }

            await patientFound.save();
            return res.status(401).json({message: "wrong password"})

        }

        patientFound.loginAttemps = 0;
        patientFound.timeOut = null;



        const token = jsonwebtoken.sign(
            {id: patientFound._id, userType: "patient"},
            config.JWT.secret,
            {expiresIn: "30d"},
        );

        res.cookie("authCookie", token, {maxAge: 30 * 34 * 60 * 1000});

        return res.status(200).json({message: "Login Exitoso"})
    } catch (error) {
        console.log("Error: "+ error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export default loginController;