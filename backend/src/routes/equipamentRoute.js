import express from "express";
import equipamentController from "../controllers/equipamentController.js";
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router();

router
    .route("/").get(equipamentController.getEquipament)
    .post(upload.single("image"), equipamentController.insertEquipament)

router
    .route("/:id")
    .put(upload.single("image"), equipamentController.updateEquipament)
    .delete(equipamentController.deleteEquipament);

export default router;
