const passport = require('passport')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

const uuid = require('uuid/v4')
const validator = require('validator')
const tokenSecret = process.env.tokenSecret || 'please set a real secret in proudction'

const User = require('../models/user')
const Blacklist = require('../models/blacklist')
const Authenticate = User.authenticate()

// api/auth/local/signup
exports.signup=(req, res) => {
  const username = validator.escape(req.body.username)
  const role = (req.body.role)
  const password = validator.escape(req.body.password)

  User.register(new User({
    _id: uuid(),
    username,
    role,
    
  }), password)
  .then(user => {
    return Authenticate(username, password)
  })
  .then(authUser => {
    if (!authUser.user) {
      return res.status(403).json({msg: 'Invalid username or password'})
    }
    return signedJwt = new Promise((resolve, reject) => {
      jwt.sign({
        id: authUser.user._id,
        username: authUser.user.username
      }, tokenSecret, {
        expiresIn: '48h'
      }, (err, result) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(result)
        }
      })
    })
    .then(userJwt => {

      let expiresDate = new Date()
      expiresDate = new Date(expiresDate.setHours(expiresDate.getHours() + 48))
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        expires: expiresDate
      }
      res.cookie('Authorization', userJwt, cookieOptions)
      return authUser.user.save()
    })
    .catch( err => {
      throw new Error(err)
    })
  })
  .then(savedUser => {
    const role=savedUser.role==1?"Admin":"User";
    return res.status(201).json({
      user: {
        id: savedUser._id,
        username: savedUser.username,
        role:role,
      },
      isAuthenticated: true
    })
  })
  .catch(err => {
    console.log('err saving user:', err)
    return res.status(500).json({msg: 'Error creating user'})
  })
};

// controller for signing user
exports.signin=(req, res, next) => {
  const username = validator.escape(req.body.username)
  const password = validator.escape(req.body.password)
   Authenticate(username, password)
  .then(authUser => {
    if (!authUser.user) {
      throw new Error('Invalid username or password')
    }
    return signedJwt = new Promise((resolve, reject) => {
      jwt.sign({
        id: authUser.user._id,
        username: authUser.user.username
      }, tokenSecret, {
        expiresIn: '48h'
      }, (err, result) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(result)
        }
      })
    })
    .then(userJwt => {

      let expiresDate = new Date()
      expiresDate = new Date(expiresDate.setHours(expiresDate.getHours() + 48))
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        expires: expiresDate
      }
      res.cookie('Authorization', userJwt, cookieOptions)
      return authUser.user.save()
    })
    .catch( err => {
      throw new Error(err)
    })
  })
  .then(savedUser => {
    // console.log('cookie:', res.cookie)
    return res.status(201).json({
      user: {
        id: savedUser._id,
        username: savedUser.username
      },
      isAuthenticated: true
    })
  })
  .catch(err => {
    console.log('err saving user:', err)
    return res.status(500).json({msg: 'Invalid username or password'})
  })
};

// controller for logging out
exports.signout =(req, res) => {
  if (!req.headers.cookies && !req.headers.cookie) {
    return res.status(401).json({
      user: 'Unauthorized'
    })
  }
  const userJwt = cookie.parse(req.headers.cookies || req.headers.cookie).Authorization
  const decodedJwt = new Promise((resolve, reject) => {
    jwt.verify(userJwt, tokenSecret, {}, (err, decoded) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(decoded)
      }
    })
  })
  .then(plainToken => {
    Blacklist.find({
      userId: plainToken.id,
      token: userJwt
    })
    .then(results => {
      if (results.length > 0) {
        return res.status(401).json({msg: 'token already blacklisted'})
      }
      return Blacklist.create({
        userId: plainToken.id,
        token: userJwt
      })
    })
    .then(blacklistedToken => {
      res.clearCookie('Authorization')
      return res.status(205).json({
        message:"Successfully Signed Out"
      })
    })
    .catch(err => {
      console.log('err blackisting token', err)
      return res.status(400).json({msg: 'bad request'})
    })
  })
};

// Authentication middleware for users to access resources
exports.isAuth=(req, res,next) => {
  if (!req.headers.cookies && !req.headers.cookie) {
    return res.status(401).json({
      user: 'Unauthorized',
      isAuthenticated: false
    })
  }
  if (req.user) {
    return next()
  }
  const userJwt = cookie.parse(req.headers.cookies || req.headers.cookie).Authorization
  if (!userJwt) {
    return res.status(401).json({msg: 'Unauthorized'})
  }
  const decodedJwt = new Promise((resolve, reject) => {
    jwt.verify(userJwt, tokenSecret, {}, (err, decoded) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(decoded)
      }
    })
  })
  .then(plainToken => {
    Blacklist.find({
      userId: plainToken.id,
      token: userJwt
    })
    .then(results => {
      if (results.length > 0) {
        return res.status(401).json({msg: 'Unauthorized'})
      }
      return User.findOne({
        _id: plainToken.id
      })
    })
    .then(user => {
      req.user = user
      return next()
    })
    .catch(err => {
      console.log('err checking token', err)
      return res.status(400).json({msg: 'bad request'})
    })
  })
};

// middleware to access Admin Resources

exports.isAdmin=(req, res, next)=>{
    if(req.profile.role===0){
        return res.status(403).json({
            error:"Admin resource! Access denied"
        });
    }
    next();
};

