/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("bucket_users").del();

  // Inserts seed entries
  await knex("bucket_users").insert([
    { bucket_id: 1, user_id: 1, role: "owner" },
    { bucket_id: 1, user_id: 2, role: "contributor" },
    { bucket_id: 2, user_id: 1, role: "owner" },
    { bucket_id: 3, user_id: 2, role: "owner" },
  ]);
}
