import express from "express";
import "dotenv/config";
import cors from "cors";

import initKnex from "knex";
import configuration from "./knexfile.js";
const knex = initKnex(configuration);

const { PORT, BACKEND_URL } = process.env;

const app = express();

import bucketRoutes from "./routes/bucket-routes.js";
import userRoutes from "./routes/user-routes.js";

app.use(cors());
app.use(express.json());
app.use("/bucket", bucketRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Listening at ${BACKEND_URL}:${PORT}`);
});
