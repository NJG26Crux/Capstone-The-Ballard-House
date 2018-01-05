'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_messages', (table) => {
    table.increments();
    table.integer('user_id').notNullable();
    table.integer('message_id').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_messages');
};
