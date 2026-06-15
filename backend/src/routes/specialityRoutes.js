import express from "express";
import specialityControllerController from "../controllers/specialityController.js";

const router = express.Router();

router
    .route("/").get(specialityControllerController.getSpecialitys)
    .post(specialityControllerController.insertSpecialitys);

router
    .route("/:id")
    .put(specialityControllerController.updateSpecialitys)
    .delete(specialityControllerController.deleteSpecialitys);


export default router;