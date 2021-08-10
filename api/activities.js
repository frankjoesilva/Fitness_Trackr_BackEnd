const express = require('express');
const activitiesRouter = express.Router();
const { requireUser } = require('./utils')
const { createActivity, getAllActivities, updateActivity } = require('../db/activities');
const { getPublicRoutinesByActivity } = require('../db/routines');

activitiesRouter.get('/', async (req, res, next) => {
    try {
        const activities = await getAllActivities()
        res.send(activities)
        return activities
    } catch (error) {
        next(error)
    }
})


activitiesRouter.post('/', requireUser, async (req, res, next) => {
    const { name, description } = req.body;
    try {
        if (Object.keys(req.body).length === 0) {
            res.send({ message: 'Missing fields' });
        }

        else {
            const createdActivities = await createActivity({
                name,
                description
            })
            res.send(createdActivities);
            next()
        }
    } catch ({ message }) {
        next({ message });
    }
});

activitiesRouter.patch('/:activityId', requireUser, async (req, res, next) => {
    const { activityId } = req.params
    const { name, description } = req.body;
    try {
        const updatedActivity = await updateActivity({ id: activityId, name, description })
        res.send(updatedActivity)
    } catch (error) {
        next(error)
    }
});


activitiesRouter.get('/:activityId/routines', async (req, res, next) => {
    const { activityId } = req.params;
    try {
        const getPublicRoutine = await getPublicRoutinesByActivity({ activityId })
        res.send(getPublicRoutine)
    } catch ({ name, message }) {
        next(error)
    }
});

module.exports = activitiesRouter