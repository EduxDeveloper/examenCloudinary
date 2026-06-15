import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
//Patients
import registerPatientRoute from "./src/routes/patientRegisterRoute.js";
import loginPatientRoute from "./src/routes/patientLoginRoute.js";
import logOutRoute from "./src/routes/patientLogOutRoute.js"
import patientControllerRoute from "./src/routes/patientControllerRoute.js"
import patientRecoveryRoute from "./src/routes/patientRecoveryRoute.js"

const app = express();

app.use(cors ({
    origin:["http://localhost:5173","http://localhost:5174"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/register", registerPatientRoute);
app.use("/api/login", loginPatientRoute);
app.use("/api/logout", logOutRoute);
app.use("/api/patient", patientControllerRoute);
app.use("/api/reovery", patientRecoveryRoute);

export default app;