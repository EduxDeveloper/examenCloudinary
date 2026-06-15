import express from "express";
import expedienteControllerController from "../controllers/expedienteController.js";

const router = express.Router();

router
    .route("/").get(expedienteControllerController.getExpediente)
    .post(expedienteControllerController.insertExpediente);

router
    .route("/:id")
    .put(expedienteControllerController.updateExpediente)
    .delete(expedienteControllerController.deleteExpediente);

export default router;