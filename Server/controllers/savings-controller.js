import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// user_id is hardcoded in all instances until I figure out user authentication
const { USER_ID } = process.env;

const savingsAdd = async (req, res) => {
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

    const newSavings = {
      bucket_id: bucket_id,
      user_id: req.userId,
      amount: req.body.amount,
      date_added: Date.now(),
    };

    const insertedIDs = await knex("savings").insert(newSavings);
    const insertedID = insertedIDs[0];

    const insertedSavings = await knex("savings")
      .where({ id: insertedID })
      .first();
    res.status(201).json(insertedSavings);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to add savings",
      error: error.message,
    });
  }
};

const savingsList = async (req, res) => {
  const { bucket_id } = req.params;
  try {
    const bucketExists = await knex("buckets").where({ id: bucket_id }).first();
    if (!bucketExists) {
      return res.status(404).json({
        message: `Bucket with ID ${bucket_id} not found`,
      });
    }

    const savings = await knex("savings")
      .join("users", "savings.user_id", "users.id")
      .select("savings.*", "users.name as user_name")
      .where({ "savings.bucket_id": bucket_id });

    res.status(200).json(savings);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Unable to retrieve savings for bucket with ID ${bucket_id}`,
      error: error.message,
    });
  }
};

const savingsDelete = async (req, res) => {
  const { savings_id } = req.params;
  try {
    const savingsToDelete = await knex("savings")
      .where({ id: savings_id })
      .first();
    if (!savingsToDelete) {
      return res
        .status(404)
        .json({ message: `Savings with ID ${savings_id} not found` });
    }

    await knex("savings").where({ id: savings_id }).del();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to delete savings",
      error: error.message,
    });
  }
};

export { savingsAdd, savingsList, savingsDelete };
