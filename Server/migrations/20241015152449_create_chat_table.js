/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("chats", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("bucket_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("buckets")
      .onDelete("CASCADE");
    table.text("message").notNullable();
    table.bigint("date_added").defaultTo(Date.now());
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTable("chats");
}
