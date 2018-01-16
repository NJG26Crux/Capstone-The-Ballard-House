
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([{
        id: 1,
        text: 'Test from Admin',
        read: 'false',
        urgent: 'false',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 2,
        text: 'Great Place to stay',
        read: 'false',
        urgent: 'false',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 3,
        text: 'Kitchen Sink is backed up!',
        read: 'false',
        urgent: 'true',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
        }
      ]);
    });
};
