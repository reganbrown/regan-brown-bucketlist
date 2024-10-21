import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// user_id is hardcoded in all instances until I figure out user authentication
const { USER_ID } = process.env;

const chatAdd = async (req, res) => {
  const { bucket_id } = req.params;

  try {
    const bucketExists = await knex("buckets").where({ id: bucket_id }).first();
    if (!bucketExists) {
      return res.status(404).json({
        message: `Bucket with ID ${bucket_id} not found`,
      });
    }

    const user = await knex("users").where({ id: req.userId }).first();
    if (!user) {
      return res.status(404).send("user not found");
    }

    const newChat = {
      user_id: req.userId,
      bucket_id: bucket_id,
      message: req.body.message,
      date_added: Date.now(),
    };

    const insertedIDs = await knex("chats").insert(newChat);
    const insertedID = insertedIDs[0];

    const insertedChat = await knex("chats").where({ id: insertedID }).first();
    res.status(201).json(insertedChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to add chat message",
      error: error.message,
    });
  }
};

const chatList = async (req, res) => {
  const { bucket_id } = req.params;
  try {
    const bucketExists = await knex("buckets").where({ id: bucket_id }).first();
    if (!bucketExists) {
      return res.status(404).json({
        message: `Bucket with ID ${bucket_id} not found`,
      });
    }

    const chats = await knex("chats")
      .join("users", "chats.user_id", "users.id")
      .select("chats.*", "users.name as user_name")
      .where({ "chats.bucket_id": bucket_id });

    res.status(200).json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Unable to retrieve chat messages for bucket with ID ${bucket_id}`,
      error: error.message,
    });
  }
};

const chatDelete = async (req, res) => {
  const { chat_id } = req.params;
  try {
    const chatToDelete = await knex("chats").where({ id: chat_id }).first();
    if (!chatToDelete) {
      return res
        .status(404)
        .json({ message: `Chat with ID ${chat_id} not found` });
    }

    await knex("chats").where({ id: chat_id }).del();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to delete chat message",
      error: error.message,
    });
  }
};

export { chatAdd, chatList, chatDelete };
