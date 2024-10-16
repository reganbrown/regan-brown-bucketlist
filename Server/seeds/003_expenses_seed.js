/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("expenses").del();

  // Insert new sample entries
  await knex("expenses").insert([
    {
      id: 1,
      bucket_id: 1,
      expense_name: "Tent",
      amount: 500.0,
      notes: "Need a Tent",
    },
    {
      id: 2,
      bucket_id: 3,
      expense_name: "Travel Tickets",
      amount: 200.0,
      notes: "Roundtrip tickets for Grand Canyon visit.",
    },
    {
      id: 3,
      bucket_id: 1,
      expense_name: "Campsite Fees",
      amount: 200.0,
      notes: "Theres an additional 50$ charge if we want late checkout",
    },
  ]);
}
