const express= require ("express");
const helmet = require('helmet');
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const tokenSecret = process.env.tokenSecret || 'please set a real secret in proudction'


const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const passport = require('passport')

const morgan=require("morgan");
const rateLimit = require("express-rate-limit");

const appRoutes=require("./routes");

const RedisStore = require('rate-limit-redis');



app=express();
app.use(helmet())

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>console.log("Database Connected"));

/*app.use(rateLimit({
    store: new RedisStore({ enableOfflineQueue: false }),
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }));*/

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection
})
//app.use(validationResult());
app.use(session({
  secret: tokenSecret,
  store: sessionStore,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    secure: true
  }
}))

app.use(passport.initialize())
app.use(passport.session())


app.use('/api', appRoutes);




//app.listen(port, ()=>console.log(`Listening on port ${port}`));
module.exports = app