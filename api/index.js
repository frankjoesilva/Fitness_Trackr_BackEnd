// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router

const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');

const express = require('express');
const apiRouter = express.Router();


const usersRouter = require('../api/users');
apiRouter.use('/users', usersRouter);

const activitiesRouter = require('../api/activities')
apiRouter.use('/activities', activitiesRouter)



// apiRouter.use(async (req, res, next) => {
//     console.log('req', req.body)
//   const prefix = 'Bearer ';
//   const auth = req.header('Authorization');

//   if (!auth) {
//     next();
//   } else if (auth.startsWith(prefix)) {
//     const token = auth.slice(prefix.length);

//     try {
//       const { id } = jwt.verify(token, JWT_SECRET);

//       if (id) {
//         req.user = await getUserById(id);
//         next();
//       }
//     } catch ({ name, message }) {
//       next({ name, message });
//     }
//   } else {
//     next({
//       name: 'AuthorizationHeaderError',
//       message: `Authorization token must start with ${ prefix }`
//     });
//   }
// });


// apiRouter.use((req, res, next) => {
//     if (req.user) {
//       console.log("User is set:", req.user);
//     }
  
//     next();
//   });




// const activitiesRouter = require('./activities');
// apiRouter.use('/activities', activitiesRouter);
// const routinesRouter = require('./routines');
// apiRouter.use('/routines', routinesRouter);
// const routine_activitiesRouter = require('./routine_activities');
// apiRouter.use('/routine_activities', routine_activitiesRouter);
module.exports = apiRouter;