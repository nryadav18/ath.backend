var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ApiRouter = require('./routers/api-router')
var cors = require('cors')
var bp = require('body-parser');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors({
  origin: ['https://ath.vercel.app'],
  credentials: true
}));
const allowedOrigins = [
  'http://localhost:5173',
  'https://adityatransporthub.vercel.app',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bp.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", ApiRouter)

var port = 9000;
app.listen(port, function () {
  console.log(`Server is Running at ${port} Successfully`)
})

mongoose.connect(process.env.MONGODB_URL)
  .then(resp => {
    console.log("DB Connected Successfully")
  })
  .catch(err => {
    console.log(err)
  })

app.get('/', (req, res) => {
    res.send(`
      <html>
        <head>
          <title>ATH Backend</title>
          <style>
            body {
              background: #f5f7fa;
              font-family: 'Segoe UI', sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
            }
            .container {
              text-align: center;
              background: white;
              padding: 40px;
              border-radius: 16px;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            h1 {
              color: #3b82f6;
              font-size: 32px;
            }
            p {
              color: #6b7280;
              font-size: 18px;
              margin-top: 10px;
            }
            .emoji {
              font-size: 48px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="emoji">🚀</div>
            <h1>ATH Backend Server</h1>
            <p>✅ Running smoothly on port ${port}</p>
          </div>
        </body>
      </html>
    `);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
