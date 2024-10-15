import express from "express";
import {
  expenseAdd,
  expenseList,
  expenseDelete,
} from "../controllers/expense-controller.js";

const router = express.Router();

router.post("/:bucket_id/expenses", expenseAdd);

router.get("/:bucket_id/expenses", expenseList);

router.delete("/:bucket_id/expenses/:expense_id", expenseDelete);

export default router;
