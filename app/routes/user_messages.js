'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.get('/user_messages', (_req, res, next) => {
  knex('user_messages')
    .orderBy('id')
    .then((user_messages) => {
      res.send(user_messages);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/user_messages/location', (req, res, next) => {
  knex('user_messages')
    .orderBy('user_message_location')
    .then((user_messages) => {
      if (!user_messages) {
        return next();
      }

      res.send(user_messages);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/user_messages', (req, res, next) => {
  knex('user_messages')
    // .insert({ name: req.body.name }, '*')
    .then((user_message) => {
      res.send(user_message[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/user_messages/:id', (req, res, next) => {
  knex('user_messages')
    .where('id', req.params.id)
    .first()
    .then((user_message) => {
      if (!user_message) {
        return next();
      }

      return knex('user_messages')
        .update(req.body)
        .where('id', req.params.id);
    })
    .then((user_message) => {
      res.send(user_message[0]);
    })
    .catch((err) => {
      next(err);
    });
});


router.delete('/user_messages/:id', (req, res, next) => {
  let user_message;

  knex('user_messages')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        return next();
      }

      user_message = row;

      return knex('user_message')
        .del()
        .where('id', req.params.id);
    })
    .then(() => {
      delete user_message.id;
      res.send(user_message);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
