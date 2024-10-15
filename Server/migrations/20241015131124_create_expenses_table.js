/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("expenses", function (table) {
    table.increments("id"); // Auto-incrementing ID
    table
      .integer("bucket_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("buckets")
      .onDelete("CASCADE"); // FK to buckets table
    table.string("expense_name").notNullable(); // Expense name
    table.decimal("amount", 10, 2).notNullable(); // Expense amount
    table.text("notes"); // Additional notes
    table.timestamps(true, true); // created_at and updated_at timestamps
  });
}

export async function down(knex) {
  return knex.schema.dropTable("expenses");
}
