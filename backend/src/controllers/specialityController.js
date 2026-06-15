import specialityModel from "../models/specialityModel.js";

const specialityController = {};

specialityController.getSpecialitys = async (req, res) => {
    try {
        const specialitys = await specialityModel.find();
        return res.status(200).json(specialitys);
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

specialityController.insertSpecialitys = async (req, res) => {
    try {
        const {specialityName, description, isAvailable} = req.body;
        const newSpeciality = new specialityModel({specialityName, description, isAvailable});
        await newSpeciality.save();
        return res.status(200).json({message:"Specialidad insertada correctamente"});
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

specialityController.updateSpecialitys = async (req, res) =>{
    try {

        let {specialityName, description, isAvailable} = req.body;
        const specialityFound = await specialityModel.findById(req.params.id);

        if(!specialityFound){
            return res.status(404).json({message: "especialidad no existe"});
        }

        const updateData = {specialityName, description, isAvailable};

        const specialityUpdated = await specialityModel.findByIdAndUpdate(req.params.id, updateData, {new: true},)
        
        return res.status(200).json({message:"especialidad actualizada correctamente"});
    } catch (error) {
            console.log("error: " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

specialityController.deleteSpecialitys = async (req, res) => {
    try {
        const specialityFound = await specialityModel.findById(req.params.id);

        if(!specialityFound){
            return res.status(404).json({message: "Especialidad no existe"});
        }

        await specialityModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Especialidad Deleted"});
    } catch (error) {
                    console.log("error: " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export default specialityController;