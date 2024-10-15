/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  // Insert new sample entries
  await knex("users").insert([
    { id: 1, name: "Regan Brown", bucket_ids: JSON.stringify([1, 2]) },
    { id: 2, name: "Tyler Brown", bucket_ids: JSON.stringify([3]) },
  ]);
}
