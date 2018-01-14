'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.get('/dates', (_req, res, next) => {
  knex('artists')
  .innerJoin('users', 'users.id', 'user_dates.user_id')
    .orderBy('id')
    .then((dates) => {
      res.send(dates);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/dates/:id', (req, res, next) => {
  knex('dates')
    .where('id', req.params.id)
    .innerJoin('users', 'users.id', 'user_dates.user_id')
    .first()
    .then((date) => {
      if (!date) {
        return next();
      }

      res.send(date);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/dates', (req, res, next) => {
  knex('dates')
    .insert(req.body)
    .then((date) => {
      res.send(date[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/dates/:id', (req, res, next) => {
  knex('dates')
    .where('id', req.params.id)
    .first()
    .then((date) => {
      if (!date) {
        return next();
      }

      return knex('dates')
        .update(req.body)
        .where('id', req.params.id);
    })
    .then((date) => {
      res.send(date[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/dates/:id', (req, res, next) => {
  let date;

  knex('dates')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        return next();
      }

      date = row;

      return knex('dates')
        .del()
        .where('id', req.params.id);
    })
    .then(() => {
      delete date.id;
      res.send(date);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

// router.delete('/artists/:id', (req, res, next) => {
//   let artist;
//
//   knex('artists')
//     .where('id', req.params.id)
//     .first()
//     .then((row) => {
//       if (!row) {
//         return next();
//       }
//
//       artist = row;
//
//       return knex('artists')
//         .del()
//         .where('id', req.params.id);
//     })
//     .then(() => {
//       delete artist.id;
//       res.send(artist);
//     });
//     .catch((err) => {
//       next(err);
//     });
// });
