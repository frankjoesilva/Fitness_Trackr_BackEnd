
const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const express = require('express');
const apiRouter = express.Router();


const usersRouter = require('../api/users');
apiRouter.use('/users', usersRouter);

const activitiesRouter = require('../api/activities')
apiRouter.use('/activities', activitiesRouter)



apiRouter.use(async (req, res, next) => {
    console.log('req', req.body)
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
      message: `Authorization token must start with ${ prefix }`
    });
  }
});


apiRouter.use((req, res, next) => {
    if (req.user) {
      console.log("User is set:", req.user);
    }
    next();
  });

  



module.exports = apiRouter;