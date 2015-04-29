var path = require('path');
var koa = require('koa');
var middlewares = require('koa-middlewares');
var routers = require('./routers');

var app = koa();

app.use(middlewares.logger());

middlewares.ejs(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  cache: false
});

app.use(middlewares.staticCache(path.join(__dirname, 'public')));

app.use(middlewares.bodyParser());

app.use(middlewares.router(app));

routers.init(app);

app.listen(3000);
console.log('app is running at http://localhost:3000');
