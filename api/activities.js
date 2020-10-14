const express = require('express');
const activitiesRouter = express.Router();
const { requireUser } = require('./utils')
const { createActivity, getAllActivities } = require('../db/activities')

activitiesRouter.get('/', async ( req, res, next ) => {
    try {
        const activities = await getAllActivities()
        res.send( activities )
        return activities
    } catch (error) {
        next(error)
    }
})


activitiesRouter.post('/activities', requireUser, async ( req, res, next ) => {
        try {
            const createdActivities = await createActivity({ name, description })
            if(createdActivities){
                res.send({ activity });
                next() 
            return createdActivities
            }
        } catch (error){
            next(error)
        }
    }); 

    module.exports = activitiesRouter