import patientModel from "../models/patientModel.js";
import { v2 as cloudinary } from "cloudinary";

const patientController = {}; 

patientController.getPatients = async (req, res) => {
    try {
        const patients = await patientModel.find();
        return res.status(200).json(patients);
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

patientController.updatPatient = async (req, res) =>{
    try {
        let {name, lastname, email, password, birthDate, phone, phoneEmergencyContacts} = req.body;
        const patientFound = await patientModel.findById(req.params.id);

        if(!patientFound){
            return res.status(404).json({message: "Usuario no existe"});
        }

        const updateData = {name, lastname, email, password, birthDate, phone, phoneEmergencyContacts};

        if(req.file){
            if(patientFound.public_id){
                await cloudinary.uploader.destroy(patientFound.public_id);
            }
        updateData.profilePhoto = req.file.path;
        updateData.public_id = req.file.filename;        
        }

        const patientUpdated = await patientModel.findByIdAndUpdate(req.params.id, updateData, {new: true},)

        return res.status(200).json({message: "Patient Updated"});
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

patientController.deletePatient = async (req, res) =>{
    try {
        const patientFound = await patientModel.findById(req.params.id);

        if(!patientFound){
            return res.status(404).json({message: "Usuario no existe"});
        }

        if(patientFound.public_id){
            await cloudinary.uploader.destroy(patientFound.public_id);
        }

        await patientModel.findByIdAndDelete(req.params.id);
        
        return res.status(200).json({message: "Patient Deleted"});
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({message: "Internal Server Error"});      
    }
}

export default patientController;

