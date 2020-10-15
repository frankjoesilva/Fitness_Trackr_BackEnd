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
    const { creatorId, isPublic, name, goal } = req.body;
    const createdRoutines = await createRoutine({ creatorId, isPublic, name, goal })
    try {
        if( createdRoutines ) {
            res.send(createdRoutines);
            next() 
        }
    } catch (error) {
      next(error)
    }
});

module.exports = routinesRouter