import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
// user_id is hardcoded in all instances until I figure out user authentication

const bucketAdd = async (req, res) => {
  try {
    const newBucket = {
      image_url: req.body.image_url,
      title: req.body.title,
      theme_name: req.body.theme_name,
      user_id: "1",
    };
    const insertedIDs = await knex("buckets").insert(newBucket);
    const intsertedID = insertedIDs[0];

    const insertedBucket = await knex("buckets")
      .where({ id: intsertedID })
      .first();
    res.status(201).json(insertedBucket);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to add bucket",
      error: error.message,
    });
  }
};

const bucketDetails = async (req, res) => {
  try {
    const bucketFound = await knex("buckets")
      .where({ id: req.params.id })
      .first();
    if (!bucketFound) {
      return res.status(404).json({
        message: `Bucket with ID ${req.params.id} not found`,
      });
    }
    res.status(200).json(bucketFound);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Unable to retrieve bucket details for bucket with ID ${req.params.id}`,
      error: error.message,
    });
  }
};

const bucketEdit = async (req, res) => {
  try {
    const bucketFound = await knex("buckets")
      .where({ id: req.params.id })
      .first()
      .update({
        image_url: req.body.image_url,
        title: req.body.title,
        theme_name: req.body.theme_name,
        user_id: "1",
      });
    if (!bucketFound) {
      return res.status(404).json({
        message: `Bucket with ID ${req.params.id} not found`,
      });
    }

    const updatedBucket = await knex("buckets")
      .where({ id: req.params.id })
      .first();

    res.status(200).json(updatedBucket);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Unable to retrieve bucket details for bucket with ID ${req.params.id}`,
      error: error.message,
    });
  }
};

const bucketDelete = async (req, res) => {
  try {
    const bucketToDelete = await knex("buckets")
      .where({ id: req.params.id })
      .first();
    if (!bucketToDelete) {
      return res
        .status(404)
        .json({ message: `Bucket with ID ${req.params.id} not found` });
    }
    await knex("expenses").where({ bucket_id: req.params.id }).del();
    await knex("savings").where({ bucket_id: req.params.id }).del();
    await knex("chats").where({ bucket_id: req.params.id }).del();
    await knex("buckets").where({ id: req.params.id }).del();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to delete bucket",
      error: error.message,
    });
  }
};

export { bucketAdd, bucketDelete, bucketDetails, bucketEdit };
