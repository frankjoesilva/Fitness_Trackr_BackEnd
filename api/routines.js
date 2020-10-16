const express = require('express');
const routinesRouter = express.Router();
const { getAllPublicRoutines, createRoutine } = require('../db/routines');
const { requireUser } = require('./utils');


routinesRouter.get('/', async ( req, res, next ) => {
    try {
        const routines = await getAllPublicRoutines()
        res.send( routines )
        return routines
    } catch (error) { 
        next(error)
    }
})

routinesRouter.post('/', requireUser, async ( req, res, next ) => {
    const { isPublic, name, goal } = req.body;
    const creatorId = req.user.id
    try {
        const createdRoutines = await createRoutine({ creatorId, isPublic, name, goal })
        res.send(createdRoutines);
    } catch (error) {
      next(error)
    }
});

module.exports = routinesRouter