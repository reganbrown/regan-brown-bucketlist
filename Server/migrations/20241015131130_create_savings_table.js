/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("savings", function (table) {
    table.increments("id"); // Auto-incrementing ID
    table
      .integer("bucket_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("buckets")
      .onDelete("CASCADE"); // FK to buckets table
    table.string("saver_name").notNullable(); // Name of the person adding the savings
    table.decimal("amount", 10, 2).notNullable(); // Savings amount
    table.date("date_added").notNullable(); // Date the savings were added
    table.timestamps(true, true); // created_at and updated_at timestamps
  });
}

export async function down(knex) {
  return knex.schema.dropTable("savings");
}
