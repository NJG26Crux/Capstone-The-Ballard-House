'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.get('/messages', (_req, res, next) => {
  knex('messages')
    .innerJoin('users', 'users.id', 'user_messages.user_id')
    .orderBy('id')
    .then((messages) => {
      res.send(messages);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/messages/unread', (req, res, next) => {
  knex('messages')
    .where('read', false)
    .innerJoin('users', 'users.id', 'user_messages.user_id')
    // .first()
    .then((messages) => {
      if (!messages) {
        return next();
      }

      res.send(messages);
    })
    .catch((err) => {
      next(err);
    });
});

// ********************************* post messages need to chain a post user_messages post *******************
router.post('/messages', (req, res, next) => {
  knex('messages')
    // .insert({ name: req.body.name }, '*')
    .then((message) => {
      res.send(message[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/messages/:id', (req, res, next) => {
  knex('messages')
    .where('id', req.params.id)
    .first()
    .then((message) => {
      if (!message) {
        return next();
      }

      return knex('messages')
        .update(req.body)
        .where('id', req.params.id);
    })
    .then((message) => {
      res.send(message[0]);
    })
    .catch((err) => {
      next(err);
    });
});

// ****************************** need to update delete to also delete user_messages ??? *******************
router.delete('/messages/:id', (req, res, next) => {
  let message;

  knex('messages')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        return next();
      }

      artist = row;

      return knex('messages')
        .del()
        .where('id', req.params.id);
    })
    .then(() => {
      delete message.id;
      res.send(message);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
