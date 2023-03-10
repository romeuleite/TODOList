/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('tasks', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.boolean('completed').notNullable();

        table.string('list_id').notNullable();

        table.foreign('list_id').references('id').inTable('lists');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('tasks');
};
