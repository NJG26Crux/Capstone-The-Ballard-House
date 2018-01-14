'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.get('/user_dates', (_req, res, next) => {
  knex('user_dates')
    .orderBy('id')
    .then((user_dates) => {
      res.send(user_dates);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/user_dates/location', (req, res, next) => {
  knex('user_dates')
    .orderBy('user_date_location')
    .then((user_dates) => {
      if (!user_dates) {
        return next();
      }

      res.send(user_dates);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/user_dates', (req, res, next) => {
  knex('user_dates')
    // .insert({ name: req.body.name }, '*')
    .then((user_date) => {
      res.send(user_date[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/user_dates/:id', (req, res, next) => {
  knex('user_dates')
    .where('id', req.params.id)
    .first()
    .then((user_date) => {
      if (!user_date) {
        return next();
      }

      return knex('user_dates')
        .update(req.body)
        .where('id', req.params.id);
    })
    .then((user_date) => {
      res.send(user_date[0]);
    })
    .catch((err) => {
      next(err);
    });
});


router.delete('/user_dates/:id', (req, res, next) => {
  let user_date;

  knex('user_dates')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        return next();
      }

      user_date = row;

      return knex('user_date')
        .del()
        .where('id', req.params.id);
    })
    .then(() => {
      delete user_date.id;
      res.send(user_date);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
