import expedienteModel from "../models/expedienteModel.js";

const expedienteController = {};

expedienteController.getExpediente = async (req, res) => {
    try {
        const expedientes = await expedienteModel.find();
        return res.status(200).json(expedientes);
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

expedienteController.insertExpediente = async (req, res) => {
    try {
        const {patient_id, diagnosis, medications, medicalNotes} = req.body;
        const newExpediente = new expedienteModel({patient_id, diagnosis, medications, medicalNotes});
        await newExpediente.save();
        return res.status(200).json({message:"Expediente insertado correctamente"});
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}


expedienteController.updateExpediente = async (req, res) =>{
    try {

        let {patient_id, diagnosis, medications, medicalNotes} = req.body;
        const expedienteFound = await expedienteModel.findById(req.params.id);

        if(!expedienteFound){
            return res.status(404).json({message: "El Expediente no existe"});
        }

        const updateData = {patient_id, diagnosis, medications, medicalNotes};

        const expedienteUpdated = await expedienteModel.findByIdAndUpdate(req.params.id, updateData, {new: true},)
        
        return res.status(200).json({message:"Expediente actualizado correctamente"});
    } catch (error) {
            console.log("error: " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

expedienteController.deleteExpediente = async (req, res) => {
    try {
        const expedienteFound = await expedienteModel.findById(req.params.id);

        if(!expedienteFound){
            return res.status(404).json({message: "El Expediente no existe"});
        }

        await expedienteModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Expediente eliminado"});
    } catch (error) {
                    console.log("error: " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export default expedienteController;