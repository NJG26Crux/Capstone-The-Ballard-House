'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('pictures', (table) => {
    table.increments();
    table.text('url').notNullable();
    table.integer('picture_location').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pictures');
};
