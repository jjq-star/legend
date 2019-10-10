var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// 自己的内容
var userRouter = require('./routes/user');
var categoryRouter = require('./routes/category');
var listRouter = require('./routes/list.js');
var cartRouter = require('./routes/cart.js');
var addressRouter = require('./routes/address.js');
var registerRouter = require('./routes/register.js');
var profileRouter = require('./routes/profile.js');
var orderRouter = require('./routes/order.js');
// 引入 Token
var Token = require('./utils/token.js');
var httpResult = require('./config');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(session({ 
	secret: "juanpi",  //sesion的加密字符串
	cookie: { httpOnly: true, maxAge: 1000 * 60 *20},
	rolling: true, //重置客户端与 session 相关的 cookie的过期时间
	saveUninitialized: false,
	resave: false
}));
app.use(express.static(path.join(__dirname, 'public')));

// 统一进行 token 验证
app.use(/\/cart|\/address|\/profile|\/order/, Token.check);

// 自己的内容
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/list', listRouter);
app.use('/cart', cartRouter);
app.use('/address', addressRouter);
app.use('/register', registerRouter);
app.use('/profile', profileRouter);
app.use('/order', orderRouter);


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
