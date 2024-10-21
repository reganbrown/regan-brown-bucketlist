/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("buckets").del();

  // Insert new sample entries
  await knex("buckets").insert([
    {
      id: 1,
      image_url: "http://localhost:8080/images/default-banner.jpeg",
      title: "Camping Trip",
      theme_name: "Navy",
    },
    {
      id: 2,
      image_url: "http://localhost:8080/images/default-banner.jpeg",
      title: "NYC Christmas",
      theme_name: "Travel",
    },
    {
      id: 3,
      image_url: "http://localhost:8080/images/default-banner.jpeg",
      title: "Backpack in Europe",
      theme_name: "Travel",
    },
  ]);
}
