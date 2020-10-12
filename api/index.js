// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('../api/users');


apiRouter.use('/users', usersRouter);

// const activitiesRouter = require('./activities');
// apiRouter.use('/activities', activitiesRouter);
// const routinesRouter = require('./routines');
// apiRouter.use('/routines', routinesRouter);
// const routine_activitiesRouter = require('./routine_activities');
// apiRouter.use('/routine_activities', routine_activitiesRouter);
module.exports = apiRouter;