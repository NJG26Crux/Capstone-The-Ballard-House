
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('dates').del()
    .then(function () {
      // Inserts seed entries

      return knex('dates').insert([{
        id: 1,
        start: '2017-12-12',
        end: '2017-12-14'
        // created_at: new Date('2016-06-29 14:26:16 UTC'),
        // updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 2,
        start: '2017-12-16',
        end: '2017-12-18'
      },
      {
        id: 3,
        start: '2017-12-20',
        end: '2017-12-22'
      }

      ]);

    });
};
