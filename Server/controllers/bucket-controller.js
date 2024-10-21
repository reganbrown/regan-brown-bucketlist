import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const bucketList = async (req, res) => {
  try {
    const buckets = await knex("buckets")
      .join("bucket_users", "buckets.id", "bucket_users.bucket_id")
      .where({ "bucket_users.user_id": req.userId })
      .select("buckets.*");

    res.status(200).json(buckets);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to fetch buckets",
      error: error.message,
    });
  }
};

const bucketAdd = async (req, res) => {
  try {
    const newBucket = {
      image_url: req.body.image_url,
      title: req.body.title,
      theme_name: req.body.theme_name,
    };

    const [insertedID] = await knex("buckets").insert(newBucket);

    await knex("bucket_users").insert({
      user_id: req.userId,
      bucket_id: insertedID,
      role: "owner",
    });

    const insertedBucket = await knex("buckets")
      .where({ id: insertedID })
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
      .where({ id: req.params.bucket_id })
      .first();

    if (!bucketFound) {
      return res.status(404).json({
        message: `Bucket with ID ${req.params.bucket_id} not found`,
      });
    }

    const userRole = await knex("bucket_users")
      .where({
        user_id: req.userId,
        bucket_id: req.params.bucket_id,
      })
      .select("role")
      .first();

    if (!userRole) {
      return res.status(403).json({
        message: "You are not authorized to view this bucket.",
      });
    }

    res.status(200).json({
      bucket: bucketFound,
      userRole: userRole.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Unable to retrieve bucket details for bucket with ID ${req.params.bucket_id}`,
      error: error.message,
    });
  }
};

const bucketEdit = async (req, res) => {
  try {
    const bucketFound = await knex("buckets")
      .where({ id: req.params.bucket_id })
      .first();

    if (!bucketFound) {
      return res.status(404).json({
        message: `Bucket with ID ${req.params.bucket_id} not found`,
      });
    }

    const userRole = await knex("bucket_users")
      .where({
        user_id: req.userId,
        bucket_id: req.params.bucket_id,
      })
      .first();

    if (!userRole || userRole.role !== "owner") {
      return res.status(403).json({
        message: "You are not authorized to edit this bucket.",
      });
    }

    const bucketUpdated = await knex("buckets")
      .where({ id: req.params.bucket_id })
      .update({
        image_url: req.body.image_url,
        title: req.body.title,
        theme_name: req.body.theme_name,
      });

    if (bucketUpdated === 0) {
      return res.status(404).json({
        message: `Bucket with ID ${req.params.bucket_id} not found`,
      });
    }

    const updatedBucket = await knex("buckets")
      .where({ id: req.params.bucket_id })
      .first();

    res.status(200).json(updatedBucket);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Unable to update bucket with ID ${req.params.bucket_id}`,
      error: error.message,
    });
  }
};

const bucketDelete = async (req, res) => {
  try {
    const bucketToDelete = await knex("buckets")
      .where({ id: req.params.bucket_id })
      .first();

    if (!bucketToDelete) {
      return res
        .status(404)
        .json({ message: `Bucket with ID ${req.params.bucket_id} not found` });
    }

    const userRole = await knex("bucket_users")
      .where({
        user_id: req.userId,
        bucket_id: req.params.bucket_id,
      })
      .first();

    if (!userRole || userRole.role !== "owner") {
      return res.status(403).json({
        message: "You are not authorized to delete this bucket.",
      });
    }

    await knex("expenses").where({ bucket_id: req.params.bucket_id }).del();
    await knex("savings").where({ bucket_id: req.params.bucket_id }).del();
    await knex("chats").where({ bucket_id: req.params.bucket_id }).del();

    await knex("bucket_users").where({ bucket_id: req.params.bucket_id }).del();

    await knex("buckets").where({ id: req.params.bucket_id }).del();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to delete bucket",
      error: error.message,
    });
  }
};

const addContributor = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await knex("users").where({ email }).first();

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ message: "User not found" });
    }

    const existingContributor = await knex("bucket_users")
      .where({
        bucket_id: req.params.bucket_id,
        user_id: user.id,
        role: "contributor",
      })
      .first();

    if (existingContributor) {
      return res.status(400).json({ message: "User is already a contributor" });
    }

    const bucketOwner = await knex("bucket_users")
      .where({
        bucket_id: req.params.bucket_id,
        user_id: user.id,
        role: "owner",
      })
      .first();

    if (bucketOwner) {
      return res
        .status(400)
        .json({ message: "Cannot add Owner as a Contributor" });
    }

    const userBucket = {
      bucket_id: req.params.bucket_id,
      user_id: user.id,
      role: "contributor",
    };

    await knex("bucket_users").insert(userBucket);
    res.status(200).json(userBucket);
  } catch (error) {
    console.log(error);
  }
};

const deleteContributor = async (req, res) => {
  const bucketID = req.params.bucket_id;
  const userID = req.params.user_id;

  try {
    const user = await knex("users").where({ id: userID }).first();

    if (!user) {
      console.log("User not found for ID:", userID);
      return res.status(404).json({ message: "User not found" });
    }

    const isContributor = await knex("bucket_users")
      .where({
        bucket_id: bucketID,
        user_id: userID,
        role: "contributor",
      })
      .first();

    if (!isContributor) {
      return res.status(400).json({ message: "User is not a contributor" });
    }

    await knex("bucket_users")
      .where({ bucket_id: bucketID, user_id: userID })
      .del();
    res.status(200).send("user removed");
  } catch (error) {
    console.log(error);
  }
};

const getContributors = async (req, res) => {
  try {
    const bucketID = req.params.bucket_id;

    const contributors = await knex("bucket_users")
      .join("users", "bucket_users.user_id", "users.id")
      .where({
        bucket_id: bucketID,
        role: "contributor",
      })
      .select("users.id", "users.name", "bucket_users.role");
    res.status(200).json(contributors);
  } catch (error) {
    console.log(error);
  }
};

export {
  bucketList,
  bucketAdd,
  bucketDelete,
  bucketDetails,
  bucketEdit,
  addContributor,
  getContributors,
  deleteContributor,
};
