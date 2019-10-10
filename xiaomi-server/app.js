var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// 自己的 category
var categoryRouter = require('./routes/category');
var productRouter = require('./routes/product');
var cartRouter = require('./routes/cart.js');
var httpResult = require('./config');
var userRouter = require('./routes/user.js');
var addressRouter = require('./routes/address.js');
// 引入 Token
var Token = require('./utils/token.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 统一进行 token 验证
app.use(/\/cart|\/address/, Token.check);


// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// 自己的 category.js
app.use('/category', categoryRouter);
app.use('/product',productRouter);
app.use('/cart',cartRouter);
app.use('/user', userRouter);
app.use('/address', addressRouter);

// 统一将数据请求返回
app.use(function(req,res,next) {
    if(res.myPromise) {
        res.myPromise
            .then(result => res.send(result))
            .catch(err => res.send(httpResult.error(err.message)));
    } else next();
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
