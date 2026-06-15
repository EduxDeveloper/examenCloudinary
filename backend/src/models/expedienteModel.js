import mongoose, { Schema, model} from "mongoose";

const expedienteSchema = new Schema({
    patient_id:{
          type: mongoose.Schema.Types.ObjectId,
          ref:"Patient"  ,
        },
    diagnosis: {type: String},
    medications:{
        medicineName: {type: String},
    },
    medicalNotes: {type: String},
},{
    timestamps: true,
    strict: false
})

export default model("Expediente", expedienteSchema);