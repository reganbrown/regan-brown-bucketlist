/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function up(knex) {
  return knex.schema.createTable("buckets", function (table) {
    table.increments("id"); // Auto-incrementing ID
    table.string("image_url"); // Image URL for the bucket list item
    table.string("title").notNullable(); // Bucket list title
    table.string("theme_name"); // Theme of the bucket list
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE"); // FK to users table
    table.timestamps(true, true); // created_at and updated_at timestamps
  });
}

export async function down(knex) {
  return knex.schema.dropTable("buckets");
}
