
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , expressLayouts = require('express-ejs-layouts')
  , expressValidator = require('express-validator')
  , flash = require('connect-flash')
  , routes = require('./routes')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(expressLayouts)
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(expressValidator());
app.use(express.methodOverride());

app.configure(function () {

  app.use(express.cookieParser('keyboard cat'));

  app.use(express.session({ cookie: { maxAge: 60000 } }));

  app.use(flash());

});



app.use(function (req, res, next) {
  var error = req.flash('error');
  res.locals.error = error.length ? error : null;
  var success = req.flash('success');
  res.locals.success = success.length ? success : null;
  res.locals.user = req.session ? req.session.user : null;
  next();
});

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
