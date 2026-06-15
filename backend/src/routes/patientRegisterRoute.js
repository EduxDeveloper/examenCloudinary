import express from "express";
import registerController from "../controllers/patientRegisterController.js";
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router();

router.route("/").post(upload.single("profilePhoto"), registerController.register);
router.route("/verify").post(registerController.verifyCode);

export default router;
