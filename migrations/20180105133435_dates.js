'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('dates', (table) => {
    table.increments();
    table.date('start').notNullable();
    table.date('end').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dates');
};
