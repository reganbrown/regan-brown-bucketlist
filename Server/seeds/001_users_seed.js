/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  // Insert new sample entries
  await knex("users").insert([
    { id: 1, name: "Regan Brown", email: "regan@regan.com" },
    { id: 2, name: "Tyler Brown", email: "tyler@tyler.com" },
  ]);
}
