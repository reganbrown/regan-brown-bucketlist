/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function up(knex) {
  return knex.schema.createTable("savings", function (table) {
    table.increments("id");
    table
      .integer("bucket_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("buckets")
      .onDelete("CASCADE");
    table.string("saver_name").notNullable();
    table.decimal("amount", 10, 2).notNullable();
    table.timestamp("date_added").defaultTo(knex.fn.now());
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable("savings");
}
