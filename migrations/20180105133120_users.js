'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('address1').notNullable();
    table.string('address2');
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.integer('zip').notNullable();
    table.string('phone').notNullable();
    table.string('email').unique().notNullable();
    table.boolean('admin').notNullable();
    table.boolean('locked').notNullable();
    table.specificType('hashed_password', 'char(60)'); //.notNullable()
    table.specificType('oldHP', 'char(60)');  //.notNullable()
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
