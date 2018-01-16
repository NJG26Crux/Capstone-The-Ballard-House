
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pictures').del()
    .then(function () {
      // Inserts seed entries

      return knex('pictures').insert([{
        id: 1,
        url: '../images/rent1.jpg',
        picture_location: 1
      },
      {
        id: 2,
        url: '../images/rent2.jpg',
        picture_location: 2
      },
      {
        id: 3,
        url: '../images/rent3.jpg',
        picture_location: 3
      },
      {
        id: 4,
        url: '../images/rent4.jpg',
        picture_location: 4
      },
      {
        id: 5,
        url: '../images/rent5.jpg',
        picture_location: 5
      },
      {
        id: 6,
        url: '../images/rent6.jpg',
        picture_location: 6
      },
      {
        id: 7,
        url: '../images/map7.png',
        picture_location: 7
      }

      ]);

    });
};
