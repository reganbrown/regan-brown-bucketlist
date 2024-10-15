/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("savings").del();

  await knex("savings").insert([
    {
      bucket_id: 1,
      saver_name: "Regan Brown",
      amount: 100.0,
    },
    {
      bucket_id: 2,
      saver_name: "Tyler Brown",
      amount: 200.0,
    },
  ]);
}
