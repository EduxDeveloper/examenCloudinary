import { Schema, model} from "mongoose";

const equipamentSchema = new Schema({
    equipamentName: {type: String},
    description: {type: String},
    brand: {type: String},
    model: {type: String},
    pucharseDate: {type: Date},
    mantinanceDate: {type: Date},
    condition: {type: String},
    image: {type: String},
    public_id: {type: String},
    status: {type: String},
    isAvailable: {type: Boolean},
},{
    timestamps: true,
    strict: false
})

export default model("Equipament", equipamentSchema);