'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('text', (table) => {
    table.increments();
    table.text('text').notNullable();
    table.integer('text_location').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('text');
};
