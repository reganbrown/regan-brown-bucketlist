import express from "express";
import {
  chatAdd,
  chatList,
  chatDelete,
} from "../controllers/chat-controller.js";

const router = express.Router();

router.post("/:bucket_id/chats", chatAdd);

router.get("/:bucket_id/chats", chatList);

router.delete("/:bucket_id/chats/:chat_id", chatDelete);

export default router;
