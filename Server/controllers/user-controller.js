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
    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUserId] = await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUserId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

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

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, userId: user.id });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err });
  }
};
