module.exports = {

  test: {
    client: 'pg',
    connection: "postgres://localhost/ballard_house_test"
  },

  development: {
    client: 'pg',
    connection: "postgres://localhost/ballard_house_dev"
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
