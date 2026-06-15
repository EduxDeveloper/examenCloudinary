import nodemailer from "nodemailer";
import patientModel from "../models/patientModel.js";
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import bcryptjs from "bcryptjs";

import { config } from "../../config.js";
import { info } from "console";

const registerController = {};

registerController.register = async (req, res) => {
    try {
        /* Campos
            name: {type: String},
            lastname: {type: String},
            email: {type: String},
            password: {type: String},
            birthDate: {type: Date},
            phone: {type: String},
            phoneEmergencyContacts:
            profilePhoto: {type: String},
            public_id: {type: String},
            isVerified: {type: Boolean},
            loginAttemps: {type: Number},
            timeOut: {type: Date},
        */ 
        const {name, lastname, email, password, birthDate, phone, phoneEmergencyContacts, isVerified, loginAttemps, timeOut} = req.body;


        const passwordHashed = await bcryptjs.hash(password, 10);

        const randomCode = crypto.randomBytes(3).toString("hex");

        const token = jsonwebtoken.sign({randomCode, name, lastname, email, password: passwordHashed, birthDate, phone, phoneEmergencyContacts, 
            profilePhoto: req.file?.path, public_id: req.file?.filename, isVerified, loginAttemps, timeOut,},
        config.JWT.secret,{
            expiresIn: "15m"
        },);

        res.cookie("registrationCookie", token, {maxAge: 15 * 60 * 1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password,
            },
        });

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "verificacion de cuenta",
            text: "para verificar su cuenta utilice este codigo: " + randomCode + " Vence en 15 minutos",
        };

        transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.log("Error: " + error);
                return res.status(400).json({message: "Error Sending Email xd"});
            }
            return res.status(200).json({message: "Email Sent"})
        })

    } catch (error) {
        console.log("Error: "+ error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

registerController.verifyCode = async (req, res) =>{
    try {
        const {verificationCodeRequest} = req.body;
        const token = req.cookies.registrationCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        const {randomCode: storedCode, name, lastname, email, password, birthDate, phone, phoneEmergencyContacts, profilePhoto, public_id, 
            isVerified, loginAttemps, timeOut } = decoded;

        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message: "codigo Incorrecto"})
        }

        const newPatient = patientModel({ name, lastname, email, password, birthDate, phone, phoneEmergencyContacts, profilePhoto, public_id, 
            isVerified: true,});

        await newPatient.save();
        
        res.clearCookie("registrationCookie");

        return res.status(200).json({message: "Cuenta Creada"});

    } catch (error) {
        console.log("Error: "+ error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export default registerController;