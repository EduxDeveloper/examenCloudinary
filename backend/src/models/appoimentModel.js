import mongoose, { Schema, model} from "mongoose";

const appoimentSchema = new Schema({
    patient_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Patient"  
    },
    speciality_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Speciality"  
    },
    appoimentDate: {type: String},
    reason: {type: String},
    status: {type: Boolean},
    observation: {type: String},
},{
    timestamps: true,
    strict: false
})

export default model("Appoiment", appoimentSchema);