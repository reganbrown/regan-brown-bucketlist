/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function up(knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id"); // Auto-incrementing ID
    table.string("name").notNullable(); // User's name
    table.json("bucket_ids"); // Store associated bucket IDs as a JSON array
    table.timestamps(true, true); // created_at and updated_at timestamps
  });
}

export async function down(knex) {
  return knex.schema.dropTable("users");
}