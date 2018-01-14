'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.get('/texts', (_req, res, next) => {
  knex('texts')
    .orderBy('id')
    .then((texts) => {
      res.send(texts);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/texts/location', (req, res, next) => {
  knex('texts')
    .orderBy('text_location')
    .then((texts) => {
      if (!texts) {
        return next();
      }

      res.send(texts);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/texts', (req, res, next) => {
  knex('texts')
    // .insert({ name: req.body.name }, '*')
    .then((text) => {
      res.send(text[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/texts/:id', (req, res, next) => {
  knex('texts')
    .where('id', req.params.id)
    .first()
    .then((text) => {
      if (!text) {
        return next();
      }

      return knex('texts')
        .update(req.body)
        .where('id', req.params.id);
    })
    .then((text) => {
      res.send(text[0]);
    })
    .catch((err) => {
      next(err);
    });
});


router.delete('/texts/:id', (req, res, next) => {
  let text;

  knex('texts')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        return next();
      }

      text = row;

      return knex('text')
        .del()
        .where('id', req.params.id);
    })
    .then(() => {
      delete text.id;
      res.send(text);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
