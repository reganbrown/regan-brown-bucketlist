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
      image_url:
        "https://www.discoverboating.com/sites/default/files/boating-camping-activity.jpg",
      title: "Camping Trip",
      theme_name: "Navy",
    },
    {
      id: 2,
      image_url:
        "https://www.flightgift.com/media/wp/FG/2024/08/Christmas-in-NYC-3.jpg",
      title: "NYC Christmas",
      theme_name: "Travel",
    },
    {
      id: 3,
      image_url:
        "https://thesavvybackpacker.com/wp-content/uploads/2013/08/backpacking-europe-packing.jpg",
      title: "Backpack in Europe",
      theme_name: "Travel",
    },
  ]);
}
