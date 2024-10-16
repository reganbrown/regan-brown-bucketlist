/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function up(knex) {
  return knex.schema.createTable("bucket_users", (table) => {
    table.increments("id");
    table
      .integer("bucket_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("buckets")
      .onDelete("CASCADE");
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("role").defaultTo("contributor"); // Optional role field
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable("bucket_users");
}
