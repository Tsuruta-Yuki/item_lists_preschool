/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.createTable('informations', (table) => {
    table.increments('id').primary();
    table.integer('持ち物id').notNullable();
    table.string('イベント').notNullable();
    table.foreign('持ち物id').references('items.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTable('informations');
};
