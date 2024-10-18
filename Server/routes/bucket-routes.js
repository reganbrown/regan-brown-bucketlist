import express from "express";
import * as bucketController from "../controllers/bucket-controller.js";
import * as chatController from "../controllers/chat-controller.js";
import * as savingsController from "../controllers/savings-controller.js";
import * as expensesController from "../controllers/expense-controller.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .get(authenticate, bucketController.bucketList)
  .post(authenticate, bucketController.bucketAdd);

router
  .route("/:bucket_id")
  .get(authenticate, bucketController.bucketDetails)
  .put(authenticate, bucketController.bucketEdit)
  .delete(authenticate, bucketController.bucketDelete);

router
  .route("/:bucket_id/chat")
  .get(authenticate, chatController.chatList)
  .post(authenticate, chatController.chatAdd);

router
  .route("/:bucket_id/chat/:chat_id")
  .delete(authenticate, chatController.chatDelete);

router
  .route("/:bucket_id/savings")
  .get(authenticate, savingsController.savingsList)
  .post(authenticate, savingsController.savingsAdd);

router
  .route("/:bucket_id/savings/:savings_id")
  .delete(authenticate, savingsController.savingsDelete);

router
  .route("/:bucket_id/expenses")
  .get(authenticate, expensesController.expenseList)
  .post(authenticate, expensesController.expenseAdd);

router
  .route("/:bucket_id/expenses/:expense_id")
  .delete(authenticate, expensesController.expenseDelete);
export default router;
