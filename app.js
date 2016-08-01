var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

var routes = require("./routes/profiling")(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({message: err.message});
});

var server = app.listen(5000, function () {
  console.log('Server running at http://127.0.0.1:5000/');
});

module.exports = app;
