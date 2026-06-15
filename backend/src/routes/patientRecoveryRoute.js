import express from "express";
import recoveryController from "../controllers/PatientRecoveryPasswordController.js";

const router = express.Router();

router.route("/").post(recoveryController.requestCode);
router.route("/verifyCode").post(recoveryController.verifyCode);
router.route("/changePassword").post(recoveryController.changePassword);

export default router;