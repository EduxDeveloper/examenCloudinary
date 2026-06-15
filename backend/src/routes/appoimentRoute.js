import express from "express";
import appoimentControllerController from "../controllers/appoimentController.js";

const router = express.Router();

router
    .route("/").get(appoimentControllerController.getAppoiment)
    .post(appoimentControllerController.insertAppoiment);

router
    .route("/:id")
    .put(appoimentControllerController.updateAppoiment)
    .delete(appoimentControllerController.deleteAppoiment);


export default router;