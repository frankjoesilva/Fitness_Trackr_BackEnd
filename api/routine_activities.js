    const express = require('express');
    const routineActivityRouter = express.Router();
    const { updateRoutineActivity, getRoutineActivityById, destroyRoutineActivity } = require('../db/routine_activities');
    const { getRoutineById, } = require('../db/routines')
    const { requireUser } = require('./utils');



    routineActivityRouter.patch('/:routineActivityId', requireUser, async ( req, res, next ) => {
        const id = req.params.routineActivityId;
		const userId = req.user.id;
		const { count, duration } = req.body;
		try {
			const routineActivity = await getRoutineActivityById(id);
			const routineId = routineActivity.routineId;
			const routine = await getRoutineById(routineId);
			const creatorId = routine.creatorId;
			if (creatorId !== userId) {
				return res.send('This is not your routine');
			}
			if (Object.keys(req.body).length === 0) {
				res.send({ message: 'Missing fields' });
			} else {
				const updatedRoutineActivity = await updateRoutineActivity({
					id,
					count,
					duration
				});
				res.send(updatedRoutineActivity);
			}
		} catch ({ name, message }) {
			next({ name, message });
		}
	});
	
	routineActivityRouter.delete('/:routineActivityId', requireUser, async (req, res, next) =>{
		const id = req.params.routineActivityId;
		const userId = req.user.id;
		try{
			const routineActivity = await getRoutineActivityById(id);
			const routineId = routineActivity.routineId;
			const routine = await getRoutineById(routineId);
			const creatorId = routine.creatorId;
			if (creatorId !== userId) {
				return res.send('This is not your routine');
			}
			else {
				const deleteRoutineActivity = await destroyRoutineActivity(id)
				res.send(deleteRoutineActivity);
			}
		} catch ({ name, message }) {
			next({ name, message });
		}
	});

module.exports = routineActivityRouter