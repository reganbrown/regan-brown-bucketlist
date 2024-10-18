import bcrypt from "bcryptjs";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  // Example hashed passwords (adjust as needed)
  const password1 = await bcrypt.hash("password123", 10);
  const password2 = await bcrypt.hash("password456", 10);

  // Insert new sample entries with hashed passwords
  await knex("users").insert([
    {
      id: 1,
      name: "Regan Brown",
      email: "regan@regan.com",
      password: password1,
    },
    {
      id: 2,
      name: "Tyler Brown",
      email: "tyler@tyler.com",
      password: password2,
    },
  ]);
}
