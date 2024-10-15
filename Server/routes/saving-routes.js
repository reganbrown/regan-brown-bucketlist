import express from "express";
import {
  savingsAdd,
  savingsDelete,
  savingsList,
  savingsList,
} from "../controllers/savings-controller.js";

const router = express.Router();

router.post("/:bucket_id/savings", savingsAdd);

router.get("/:bucket_id/savings", savingsList);

router.delete("/:bucket_id/savings/:savings_id", savingsDelete);

export default router;
