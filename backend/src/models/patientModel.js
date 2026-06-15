import { Schema, model} from "mongoose";

const patientSchema = new Schema({
    name: {type: String},
    lastname: {type: String},
    email: {type: String},
    password: {type: String},
    birthDate: {type: Date},
    phone: {type: String},
    phoneEmergencyContacts:{
        phone:{type: String},
        nameEmergencyContact: {type: String},
    },
    profilePhoto: {type: String},
    public_id: {type: String},
    isVerified: {type: Boolean},
    loginAttemps: {type: Number},
    timeOut: {type: Date},
},{
    timestamps: true,
    strict: false
})

export default model("Patient", patientSchema);