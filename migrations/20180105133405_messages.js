'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', (table) => {
    table.increments();
    table.string('text').notNullable();
    table.boolean('read').notNullable();
    table.boolean('urgent').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
