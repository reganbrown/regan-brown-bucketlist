/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("savings").del();

  await knex("savings").insert([
    {
      bucket_id: 1,
      user_id: 1,
      amount: 100.0,
    },
    {
      bucket_id: 2,
      user_id: 2,
      amount: 200.0,
    },
  ]);
}
