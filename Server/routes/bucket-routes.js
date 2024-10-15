import express from "express";
import * as bucketController from "../controllers/bucket-controller.js";

const router = express.Router();

router
  .route("/")
  .get(bucketController.bucketList)
  .post(bucketController.bucketAdd);

router
  .route("/:bucket_id")
  .get(bucketController.bucketDetails)
  .put(bucketController.bucketEdit)
  .delete(bucketController.bucketDelete);

export default router;
