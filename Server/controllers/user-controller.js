import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

export const userDetails = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await knex("users").where({ id: userId }).first();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("Error fetching user details:", err);
    res
      .status(500)
      .json({ message: "Failed to retrieve user details", error: err });
  }
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await knex("users").where({ email: email }).first();

    if (user) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUserId] = await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUserId }, process.env.JWT_SECRET);

    res.status(201).json({ token, userId: newUserId });
  } catch (err) {
    res.status(500).json({ message: "Sign up failed", error: err });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await knex("users").where({ email }).first();

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("Invalid password for email:", email);
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.status(200).json({ token, userId: user.id });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userToDelete = await knex("users").where({ id: req.userId }).first();

    if (!userToDelete) {
      return res.status(404).json({
        message: `User with ID ${req.userId} not found`,
      });
    }

    await knex("buckets")
      .whereIn(
        "id",
        knex("bucket_users")
          .select("bucket_id")
          .where({ user_id: req.userId, role: "owner" })
      )
      .del();

    await knex("bucket_users").where({ user_id: req.userId }).del();
    await knex("savings").where({ user_id: req.userId }).del();
    await knex("chats").where({ user_id: req.userId }).del();

    await knex("users").where({ id: req.userId }).del();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to delete user",
      error: error.message,
    });
  }
};
