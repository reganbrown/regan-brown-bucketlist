export async function seed(knex) {
  // Deletes ALL existing entries in the chats table
  await knex("chats").del();

  // Inserts seed entries for the chats table
  await knex("chats").insert([
    {
      id: 1,
      user_id: 1, // Assuming user_id 1 exists in the 'users' table
      bucket_id: 1, // Assuming bucket_id 1 exists in the 'buckets' table
      message: "I can’t wait for our camping trip next weekend!",
    },
    {
      id: 2,
      user_id: 2, // Assuming user_id 2 exists in the 'users' table
      bucket_id: 1, // Same bucket as previous chat (same trip)
      message: "I’ll bring the tents and gear!",
    },
    {
      id: 3,
      user_id: 1, // Assuming user_id 1 exists in the 'users' table
      bucket_id: 2, // Another bucket (e.g., a NYC trip)
      message: "NYC during Christmas will be magical!",
    },
    {
      id: 4,
      user_id: 2, // Assuming user_id 3 exists in the 'users' table
      bucket_id: 2, // Same bucket as previous chat (NYC trip)
      message: "I’ll book the hotel and flights!",
    },
  ]);
}
