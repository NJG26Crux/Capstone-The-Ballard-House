'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id: 1,
        first_name: 'Jeff',
        last_name: 'Mobley',
        address1: '123',
        address2: '',
        city: 'Seattle',
        state: 'WA',
        zip: 98107,
        phone: '1234567890',
        email: 'test@test.com',
        admin: 'true',
        hashed_password:
        // 1234
       '$2a$12$5hdRYVXHPgWY1PBphc4KZuWeBrovYGd3RTGrzK3MSSPBE6JBu1X86',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 2,
        first_name: 'USER',
        last_name: '2',
        address1: '123',
        address2: '',
        city: 'Seattle',
        state: 'WA',
        zip: 98107,
        phone: '1234567890',
        email: 'test2@test.com',
        admin: 'false',
        hashed_password:
        // 1234
       '$2a$12$QpuraG906JI5g8aEAu1IH.rIGj6Fx.8Z.eILRSIk8xXgOjQu1VIWS',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 3,
        first_name: 'USER',
        last_name: '3',
        address1: '123',
        address2: '',
        city: 'Seattle',
        state: 'WA',
        zip: 98107,
        phone: '1234567890',
        email: 'test3@test.com',
        admin: 'false',
        hashed_password:
        // 1234
       '$2a$12$ThlMVQX8uEEVeqqL22gvG.J3xmQn1Z5opMbSSmPfQRz1vmt9g3dva',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }
    ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
