// Import dotenv to process environment variables from `.env` file.
import "dotenv/config";

export default {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: "utf8",
  },
  migrations: {
    directory: "./migrations", // Path to your migrations folder
    tableName: "knex_migrations", // This is where Knex will keep track of the migrations applied
  },
};
