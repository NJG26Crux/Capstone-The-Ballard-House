'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const cookieParser = require('cookie-parser')

if (process.env.NODE_ENV !== 'test') {
  const logger = require('morgan')
  app.use(logger('dev'))
}

app.use(cookieParser());
app.use(bodyParser.json({limit: '1mb'})); //‘5mb’
app.use(express.static(path.join(__dirname, '/../', 'node_modules')))
app.use(express.static(path.join(__dirname, 'public')))

app.use(require('./routes/dates'))
app.use(require('./routes/messages'))
app.use(require('./routes/pictures'))
app.use(require('./routes/text'))
app.use(require('./routes/token'))
app.use(require('./routes/user_dates'))
app.use(require('./routes/user_messages'))
app.use(require('./routes/users'))

app.use('*', function(req, res, next) {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')})
})

app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  console.log(err)
  res.status(err.output.statusCode || 500)
  res.json(err)
})

const port = process.env.PORT || 8500;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app
