'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.get('/messages', (_req, res, next) => {
  knex.from('messages')
    .innerJoin('user_messages', 'messages.id', '=',  'user_messages.message_id')
    .innerJoin('users', 'users.id', '=',  'user_messages.user_id')
    .orderBy('messages.id')
    .then((messages) => {
      res.send(messages);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/message/', (_req, res, next) => {
  knex.from('messages')
    // .where('id', req.params.id)
    // .first()
    // .innerJoin('user_messages', 'messages.id', '=',  'user_messages.message_id')
    // .innerJoin('users', 'users.id', '=',  'user_messages.user_id')
    .orderBy('messages.id')
    .then((messages) => {
      res.send(messages);
    })
    .catch((err) => {
      next(err);
    });
});

// router.get('/messages/unread', (req, res, next) => {
//   knex('messages')
//     .where('read', false)
//     .innerJoin('users', 'users.id', 'user_messages.user_id')
//     // .first()
//     .then((messages) => {
//       if (!messages) {
//         return next();
//       }
//
//       res.send(messages);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// ********************************* post messages need to chain a post user_messages post *******************
router.post('/message', (req, res, next) => {
  console.log('@ post req.body: ', req.body);
  let postMsg = {};
  knex('messages')
    // .insert({ name: req.body.name }, '*')
    // .insert(req.body , '*')
    .then((message) => {
      res.send(message[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/message/:id', (req, res, next) => {
  let patchMessage = {};
  console.log('req.body: ', req.body);
  knex('messages')
    .where('id', req.params.id)
    .first()
    .then((message) => {
      if (!message) {
        return next();
      }

      console.log('b4 message: ', message);
      message.read = !message.read;
      patchMessage = message
      return knex('messages')
        .update(message)
        .where('id', req.params.id);
    })
    .then((msg) => {
      console.log('patchMessage: ', patchMessage);
      res.send(patchMessage);
    })
    .catch((err) => {
      next(err);
    });
});

// ****************************** need to update delete to also delete user_messages ??? *******************
// router.delete('/messages/:id', (req, res, next) => {
//   let message;
//
//   knex('messages')
//     .where('id', req.params.id)
//     .first()
//     .then((row) => {
//       if (!row) {
//         return next();
//       }
//
//       artist = row;
//
//       return knex('messages')
//         .del()
//         .where('id', req.params.id);
//     })
//     .then(() => {
//       delete message.id;
//       res.send(message);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

module.exports = router;
