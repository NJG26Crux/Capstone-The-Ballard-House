'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

const authorize = function(req, res, next) {
  if (!req.cookies.token) {
    return next(boom.create(401, 'Unauthorized'));
  }
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, playload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
      //hide "hello"
    }

    req.claim = playload;

    next();
  });
};

router.get('/users/firstName', authorize, (req, res, next) => {

  const userId = req.claim.userId;
  knex('users')
    .where('id', userId)
    .then((user) => {
      if (user) {
        console.log('@ routes.users.firstName 36 user: ', user);
        // return user[0].first_name
        res.send(user)
      }
    })
    //****************************
    // .then((firstName) => {
    //
    //   res.setHeader('Content-Type', 'application/json')
    //   console.log('routes.users.get.firstName: ', firstName);
    //   res.send({firstName: firstName});
    // })
    //***************************
    .catch((err) => {
      next(err);
    });
});

router.get('/users', (req, res, next) => {
  knex('users')
    .then((result) => {
      res.send(result)
    })
    .catch((err) => next(err))
})

router.get('/users/id/:id', (req, res, next) => {
  knex('users')
    .where('id', req.params.id)
    .first()
    .then((result) => {
      if (!result) {
        return next();
      }

      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
});
// ****************************************************
router.get('/users/email/:email', (req, res, next) => {
  console.log(req.params);
  knex('users')
    .where('users.email', req.params.email)
    .first()
    .then((result) => {
      if (!result) {
        return next();
      }

      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
});
// ****************************************************
router.post('/users', (req, res, next) => {
  console.log('we are at routes.users.post.');
  req.body.admin = false;
  const { first_name, last_name, address_1, address_2, city, state, zip, email, phone, admin, password, } = req.body;
  console.log('req.body: ', req.body);
  knex('users')
    .where('email', email)
    .first()
    .then((user) => {
      if (user) {
        throw boom.create(400, 'Email already exists');
      }

      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      console.log('we are at routes.users.post.then hash');
      const { firstName, lastName, address1, address2, city, state, zip, email, phone, admin } = req.body;
      console.log('users.js 113 req.body: ', req.body);
      console.log('firstName: ', req.body.firstName);
      console.log('lastName: ', req.body.lastName);
      console.log('address1: ', req.body.address1);
      console.log('address2: ', req.body.address2);
      console.log('city: ', req.body.city);
      console.log('state: ', req.body.state);
      console.log('zip: ', req.body.zip);
      console.log('email: ', req.body.email);
      console.log('phone: ', req.body.phone);
      console.log('admin: ', req.body.admin);

      const insertUser = { firstName, lastName, address1, address2, city, state, zip, email, phone, admin, hashedPassword };

      return knex('users').insert(decamelizeKeys(insertUser), '*');
      console.log('insertUser: ', insertUser);
    })
    .then((rows) => {
      console.log('@ post user 131: ', rows);
      const user = camelizeKeys(rows[0]);
      const claim = { userId: user.id};
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days'
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),  // 7 days
        secure: router.get('env') === 'production'
      });
      console.log('routes.users.post.user: ', user);
      delete user.hashedPassword;

      res.send(user);
    })
    .catch((err) => {
      console.log('@ .catch error 149: ');
      console.log(err);
      // res.send(false);
      next(err);
    });
});

module.exports = router;
