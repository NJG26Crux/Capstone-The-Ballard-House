'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.get('/pictures', (_req, res, next) => {
  knex('pictures')
    .orderBy('id')
    .then((messages) => {
      res.send(messages);
    })
    .catch((err) => {
      next(err);
    });
});

// router.get('/pictures/location', (req, res, next) => {
//   knex('pictures')
//     .orderBy('picture_location')
//     .then((pictures) => {
//       if (!pictures) {
//         return next();
//       }
//
//       res.send(pictures);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

router.get('/pictures/location/1', (req, res, next) => {
  knex('pictures')
    .where('pictures.id', 1)
    .then((pic) => {
      if (!pic) {
        return next();
      }

      res.send(pic);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/pictures/location/2', (req, res, next) => {
  knex('pictures')
    .where('pictures.id', 2)
    .then((pic) => {
      if (!pic) {
        return next();
      }

      res.send(pic);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/pictures/location/3', (req, res, next) => {
  knex('pictures')
    .where('pictures.id', 3)
    .then((pic) => {
      if (!pic) {
        return next();
      }

      res.send(pic);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/pictures/location/4', (req, res, next) => {
  knex('pictures')
    .where('pictures.id', 4)
    .then((pic) => {
      if (!pic) {
        return next();
      }

      res.send(pic);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/pictures/location/5', (req, res, next) => {
  knex('pictures')
    .where('pictures.id', 5)
    .then((pic) => {
      if (!pic) {
        return next();
      }

      res.send(pic);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/pictures/location/6', (req, res, next) => {
  knex('pictures')
    .where('pictures.id', 6)
    .then((pic) => {
      if (!pic) {
        return next();
      }

      res.send(pic);
    })
    .catch((err) => {
      next(err);
    });
});



router.get('/pictures/location/7', (req, res, next) => {
  knex('pictures')
    .where('pictures.id', 7)
    .then((pic) => {
      if (!pic) {
        return next();
      }

      res.send(pic);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/pictures', (req, res, next) => {
  knex('pictures')
    // .insert({ name: req.body.name }, '*')
    .then((picture) => {
      res.send(picture[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/pictures/:id', (req, res, next) => {
  knex('pictures')
    .where('id', req.params.id)
    .first()
    .then((picture) => {
      if (!picture) {
        return next();
      }

      return knex('pictures')
        .update(req.body)
        .where('id', req.params.id);
    })
    .then((picture) => {
      res.send(picture[0]);
    })
    .catch((err) => {
      next(err);
    });
});


// router.delete('/pictures/:id', (req, res, next) => {
//   let picture;
//
//   knex('pictures')
//     .where('id', req.params.id)
//     .first()
//     .then((row) => {
//       if (!row) {
//         return next();
//       }
//
//       picture = row;
//
//       return knex('picture')
//         .del()
//         .where('id', req.params.id);
//     })
//     .then(() => {
//       delete picture.id;
//       res.send(picture);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

module.exports = router;
