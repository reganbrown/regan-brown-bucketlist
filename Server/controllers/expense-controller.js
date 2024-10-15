import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// user_id is hardcoded in all instances until I figure out user authentication

const expenseAdd = async (req, res) => {
  const { bucket_id } = req.params;
  try {
    const bucketExists = await knex("buckets").where({ id: bucket_id }).first();
    if (!bucketExists) {
      return res.status(404).json({
        message: `Bucket with ID ${bucket_id} not found`,
      });
    }

    const newExpense = {
      bucket_id: bucket_id,
      name: req.body.name,
      amount: req.body.amount,
    };

    const insertedIDs = await knex("expenses").insert(newExpense);
    const insertedID = insertedIDs[0];

    const insertedExpense = await knex("expenses")
      .where({ id: insertedID })
      .first();
    res.status(201).json(insertedExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to add expense",
      error: error.message,
    });
  }
};

const expenseList = async (req, res) => {
  const { bucket_id } = req.params;
  try {
    const bucketExists = await knex("buckets").where({ id: bucket_id }).first();
    if (!bucketExists) {
      return res.status(404).json({
        message: `Bucket with ID ${bucket_id} not found`,
      });
    }

    const expenses = await knex("expenses").where({ bucket_id: bucket_id });
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Unable to retrieve expenses for bucket with ID ${bucket_id}`,
      error: error.message,
    });
  }
};

const expenseDelete = async (req, res) => {
  const { expense_id } = req.params;
  try {
    const expenseToDelete = await knex("expenses")
      .where({ id: expense_id })
      .first();
    if (!expenseToDelete) {
      return res
        .status(404)
        .json({ message: `Expense with ID ${expense_id} not found` });
    }

    await knex("expenses").where({ id: expense_id }).del();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to delete expense",
      error: error.message,
    });
  }
};

export { expenseAdd, expenseList, expenseDelete };
