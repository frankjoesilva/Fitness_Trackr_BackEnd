
const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const express = require('express');
const apiRouter = express.Router();


const usersRouter = require('./users');

const activitiesRouter = require('./activities')

const routinesRouter = require('./routines')

const routineActivityRouter = require('./routine_activities')


apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const returnToken = jwt.verify(token, JWT_SECRET);
      const tokenId = returnToken && returnToken.id
      if (tokenId) {
        req.user = await getUserById(tokenId);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`
    });
  }
});


apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }
  next();
});


apiRouter.use('/users', usersRouter);

apiRouter.use('/activities', activitiesRouter)

apiRouter.use('/routines', routinesRouter)

apiRouter.use('/routine_activities', routineActivityRouter)

module.exports = apiRouter;