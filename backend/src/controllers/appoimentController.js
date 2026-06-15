import appoimentModel from "../models/appoimentModel.js";

const appoimentController = {};

appoimentController.getAppoiment = async (req, res) => {
    try {
        const Appoiments = await appoimentModel.find();
        return res.status(200).json(Appoiments);
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

appoimentController.insertAppoiment = async (req, res) => {
    try {
        const {patient_id, speciality_id, appoimentDate, reason, status, observation} = req.body;
        const newAppoiment = new appoimentModel({patient_id, speciality_id, appoimentDate, reason, status, observation});
        await newAppoiment.save();
        return res.status(200).json({message:"Cita insertada correctamente"});
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

appoimentController.updateAppoiment = async (req, res) =>{
    try {

        let {patient_id, speciality_id, appoimentDate, reason, status, observation} = req.body;
        const appoimentFound = await appoimentModel.findById(req.params.id);

        if(!appoimentFound){
            return res.status(404).json({message: "Cita no existe"});
        }

        const updateData = {patient_id, speciality_id, appoimentDate, reason, status, observation};

        const appoimentUpdated = await appoimentModel.findByIdAndUpdate(req.params.id, updateData, {new: true},)
        
        return res.status(200).json({message:"Cita actualizada correctamente"});
    } catch (error) {
            console.log("error: " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

appoimentController.deleteAppoiment = async (req, res) => {
    try {
        const appoimentFound = await appoimentModel.findById(req.params.id);

        if(!appoimentFound){
            return res.status(404).json({message: "Cita no existe"});
        }

        await appoimentModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Cita eliminada"});
    } catch (error) {
                    console.log("error: " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export default appoimentController;