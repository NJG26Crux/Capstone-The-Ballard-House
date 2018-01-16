
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_messages').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_messages').insert([{
        id: 1,
        user_id: 1,
        message_id: 1
      },
      {
        id: 2,
        user_id: 2,
        message_id: 2
      },
      {
        id: 3,
        user_id: 3,
        message_id: 3
      }
      ]);
    });
};
