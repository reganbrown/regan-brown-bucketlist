/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("savings", function (table) {
    table.increments("id");

    // Foreign key to the buckets table
    table
      .integer("bucket_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("buckets")
      .onDelete("CASCADE");

    // Foreign key to the users table
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.decimal("amount", 10, 2).notNullable();
    table.bigint("date_added").defaultTo(Date.now());
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable("savings");
}
