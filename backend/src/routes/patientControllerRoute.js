import express from "express";
import patientController from "../controllers/patientController.js";
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router();

router
    .route("/").get(patientController.getPatients);

router
    .route("/:id")
    .put(upload.single("profilePhoto"), patientController.updatPatient)
    .delete(patientController.deletePatient);


export default router;
