import equipamentModel from "../models/equipamentModel.js";
import { v2 as cloudinary } from "cloudinary";

const equipamentController = {};

equipamentController.getEquipament = async (req, res) => {
    try {
        const Equipament = await equipamentModel.find();
        return res.status(200).json(Equipament);
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}


equipamentController.insertEquipament = async (req, res) => {
    try {
        const {equipamentName, description, brand, model, pucharseDate, mantinanceDate, condition, status, isAvailable} = req.body;
        const newEquipament = new equipamentModel({equipamentName, description, brand, model, pucharseDate, mantinanceDate, condition,
            image: req.file?.path, public_id: req.file?.filename, status, isAvailable });
        await newEquipament.save();
        return res.status(200).json({message:"Equipamiento insertado correctamente"});
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

equipamentController.updateEquipament = async (req, res) =>{
    try {

        let {equipamentName, description, brand, model, pucharseDate, mantinanceDate, condition, status, isAvailable} = req.body;
        const equipamentFound = await equipamentModel.findById(req.params.id);

        if(!equipamentFound){
            return res.status(404).json({message: "El equipamiento no existe"});
        }

        const updateData = {equipamentName, description, brand, model, pucharseDate, mantinanceDate, condition, status, isAvailable};

        if(req.file){
                    if(equipamentFound.public_id){
                        await cloudinary.uploader.destroy(equipamentFound.public_id);
                    }
                updateData.image = req.file.path;
                updateData.public_id = req.file.filename;        
                }

        const equipamentUpdated = await equipamentModel.findByIdAndUpdate(req.params.id, updateData, {new: true},)
        
        return res.status(200).json({message:"Equipamiento actualizado correctamente"});
    } catch (error) {
            console.log("error: " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

equipamentController.deleteEquipament = async (req, res) => {
   try {
           const equipamentFound = await equipamentModel.findById(req.params.id);
   
           if(!equipamentFound){
               return res.status(404).json({message: "Equipamiento no existe"});
           }
   
           if(equipamentFound.public_id){
               await cloudinary.uploader.destroy(equipamentFound.public_id);
           }
   
           await equipamentModel.findByIdAndDelete(req.params.id);
           
           return res.status(200).json({message: "Equipamiento Deleted"});
       } catch (error) {
           console.log("error: " + error);
           return res.status(500).json({message: "Internal Server Error"});      
       }
}

export default equipamentController;