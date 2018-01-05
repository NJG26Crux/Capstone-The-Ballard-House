'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_dates', (table) => {
    table.increments();
    table.integer('user_id').notNullable();
    table.integer('dates_id').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_dates');
};
