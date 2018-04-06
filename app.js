var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var opn = require('opn');

var indexRouter = require('./routes/index');

var app = express();
import {url,oauth2Client} from './server/sevices/googleFit-services';
import {insertTokenIntoDb} from './server/sevices/firebase-services';

console.log('The authorization url', url);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/oauth2callback', (req, res) => {
  const code = req.query.code;
  oauth2Client.getToken(code, (err, tokens) => {
    if (err) {
      console.error('Error getting oAuth tokens:');
      throw err;
    }
    oauth2Client.credentials = tokens;
    oauth2Client.setCredentials({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date
    })
        console.log("Please find the credentials ", JSON.stringify(oauth2Client.credentials));
       // insertTokenIntoDb(tokens);

    res.send('Authentication successful! Please return to the console.');
    
  });
});

app.all('/wit/*',indexRouter);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen('3005',function(){
  console.log("Server running in 3000");
 //opn(url, { wait: false });
})
module.exports = app;
