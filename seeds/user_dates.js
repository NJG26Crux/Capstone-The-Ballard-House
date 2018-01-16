
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_dates').del()
    .then(function () {
      // Inserts seed entries

      return knex('user_dates').insert([{
        id: 1,
        user_id: 1,
        dates_id: 1
      },
      {
        id: 2,
        user_id: 2,
        dates_id: 2
      },
      {
        id: 3,
        user_id: 3,
        dates_id: 3
      }
      ]);

    });
};
