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
      theme_name: "Adventure",
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
    {
      id: 4,
      image_url:
        "https://thesavvybackpacker.com/wp-content/uploads/2013/08/backpacking-europe-packing.jpg",
      title: "Grink Theme",
      theme_name: "Grink",
    },
    {
      id: 5,
      image_url:
        "https://thesavvybackpacker.com/wp-content/uploads/2013/08/backpacking-europe-packing.jpg",
      title: "Royal Theme",
      theme_name: "Royal",
    },
    {
      id: 6,
      image_url:
        "https://thesavvybackpacker.com/wp-content/uploads/2013/08/backpacking-europe-packing.jpg",
      title: "Elegant Theme",
      theme_name: "Elegant",
    },
    {
      id: 7,
      image_url:
        "https://thesavvybackpacker.com/wp-content/uploads/2013/08/backpacking-europe-packing.jpg",
      title: "Cofffee Theme",
      theme_name: "Coffee",
    },
    {
      id: 8,
      image_url:
        "https://thesavvybackpacker.com/wp-content/uploads/2013/08/backpacking-europe-packing.jpg",
      title: "Rose Theme",
      theme_name: "Rose",
    },
  ]);
}
