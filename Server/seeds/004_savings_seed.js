/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("savings").del();

  // Insert new sample entries
  await knex("savings").insert([
    {
      id: 1,
      bucket_id: 1,
      saver_name: "Regan Brown",
      amount: 100.0,
      date_added: "2024-01-01",
    },
    {
      id: 2,
      bucket_id: 3,
      saver_name: "Tyler Brown",
      amount: 200.0,
      date_added: "2024-02-01",
    },
  ]);
}
