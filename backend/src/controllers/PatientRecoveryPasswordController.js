import nodemailer from "nodemailer";
import patientModel from "../models/patientModel.js";
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import { randomBytes } from "crypto";
import { config } from "../../config.js";

const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async (req, res) => {
  try {
    const { email } = req.body;

    const randomCode = crypto.randomBytes(3).toString("hex");

    const token = jsonwebtoken.sign(
      {
        randomCode,
        email,
      },
      config.JWT.secret,
      {
        expiresIn: "15m",
      },
    );

    res.cookie("recoveryCookie", token, { maxAge: 15 * 60 * 1000 });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_password,
      },
    });

    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "verificacion de cuenta",
      text:
        "para verificar su cuenta utilice este codigo: " +
        randomCode +
        " Vence en 15 minutos",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error: " + error);
        return res.status(400).json({ message: "Error Sending Email xd" });
      }
      return res.status(200).json({ message: "Email Sent" });
    });

  } catch (error) {
    console.log("Error: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

recoveryPasswordController.verifyCode = async (req, res) =>{
    try {
        const {code} = req.body;

        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if(code !== decoded.randomCode){
            return res.status(400).json({ message: "Codigo incorrecto" });
        }

        const newToken = jsonwebtoken.sign({email: decoded.email, verified: true},
            config.JWT.secret,
            {expiresIn: "15m"}
        )

        res.cookie("recoveryCookie", newToken, {maxAge: 15 * 60 * 1000});

        return res.status(200).json({ message: "Codigo Validado Correctamente"});

    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

recoveryPasswordController.changePassword = async (req, res) => {
    try {
        const {newPassord, confirmPassword} = req.body;

        if(newPassord !== confirmPassword){
            return res.status(400).json({ message: "Contraseñas no conciden" });
        }

        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if(!decoded.verified){
            return res.status(400).json({ message: "Codigo no validado" });
        }

        const passwordHash = await bcryptjs.hash(newPassord, 10)

        await patientModel.findOneAndUpdate(
            {email: decoded.email},
            {password: passwordHash},
            {new: true}
        );

        res.clearCookie("recoveryCookie");
        return res.status(200).json({ message: "Contraseña Cambiada"});

    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export default recoveryPasswordController;
