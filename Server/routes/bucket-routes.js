import express from "express";
import * as bucketController from "../controllers/bucket-controller.js";
import * as chatController from "../controllers/chat-controller.js";
import * as savingsController from "../controllers/savings-controller.js";
import * as expensesController from "../controllers/expense-controller.js";

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

router
  .route("/:bucket_id/chat")
  .get(chatController.chatList)
  .post(chatController.chatAdd);

router.route("/:bucket_id/chat/:chat_id").delete(chatController.chatDelete);

router
  .route("/:bucket_id/savings")
  .get(savingsController.savingsList)
  .post(savingsController.savingsAdd);

router
  .route("/:bucket_id/savings/:savings_id")
  .delete(savingsController.savingsDelete);

router
  .route("/:bucket_id/expenses")
  .get(ex.savingsList)
  .post(savingsController.savingsAdd);

router
  .route("/:bucket_id/savings/:savings_id")
  .delete(savingsController.savingsDelete);
export default router;
