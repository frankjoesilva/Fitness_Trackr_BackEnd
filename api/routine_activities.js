    const express = require('express');
    const routineActivityRouter = express.Router();
    const { updateRoutineActivity, getRoutineActivitiesByRoutine } = require('../db/routine_activities');
    const { requireUser } = require('./utils');

    routineActivityRouter.patch('/:routineActivityId', requireUser, async ( req, res, next ) => {
        const { routineActivityId } = req.params
        const { duration, count } = req.body
        const updateFields = {};
        try {
            if (duration) {
                updateFields.duration = duration
            }
            if (count) {
                updateFields.count = count
            }
            // const originalRoutine = await getRoutineActivitiesByRoutine({id});
            // if(originalRoutine){
            const updatedRoutine = await updateRoutineActivity({id:routineActivityId, ...req.body});
            console.log('updatedRoutine', updatedRoutine)
            res.send(updatedRoutine)
            // }
        } catch (error) {
          next(error)
        }
    });


module.exports = routineActivityRouter