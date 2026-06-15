import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
//Patients
import registerPatientRoute from "./src/routes/patientRegisterRoute.js"

const app = express();

app.use(cors ({
    origin:["http://localhost:5173","http://localhost:5174"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/register", registerPatientRoute);


export default app;