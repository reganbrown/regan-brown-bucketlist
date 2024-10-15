/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("chats", (table) => {
    table.increments("id").primary(); // Auto-incrementing ID for the chat
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users") // Foreign key referencing 'users' table
      .onDelete("CASCADE"); // When user is deleted, delete chats
    table
      .integer("bucket_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("buckets") // Foreign key referencing 'buckets' table
      .onDelete("CASCADE"); // When a bucket is deleted, delete associated chats
    table.text("message").notNullable(); // The chat message content
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Timestamp of when the message was sent
    table.timestamp("updated_at").defaultTo(knex.fn.now()); // Timestamp for the last update
  });
}

export async function down(knex) {
  await knex.schema.dropTable("chats");
}
