const e = require('express');
const express = require('express');
const routinesRouter = express.Router();
const { getAllPublicRoutines, createRoutine, updateRoutine, destroyRoutine } = require('../db/routines');
const { addActivityToRoutine } = require('../db/routine_activities');
const { requireUser } = require('./utils');



routinesRouter.get('/', async (req, res, next) => {
    try {
        const routines = await getAllPublicRoutines()
        res.send(routines)
    } catch (error) {
        next(error)
    }
})

routinesRouter.post('/', requireUser, async (req, res, next) => {
    const { isPublic, name, goal } = req.body;
    const creatorId = req.user.id
    try {

        if (name === '' || goal === '') {
            next({
                name: "MissingCredentialsError",
                message: "Please supply both a name and description",
            });
        }
        else {
            const createdRoutines = await createRoutine({ creatorId, isPublic, name, goal })
            res.send(createdRoutines);
        }
    } catch (error) {
        next(error)
    }
});

routinesRouter.post('/', requireUser, async (req, res, next) => {
    const { count, duration } = req.body
    const { routineId, activityId } = req.user.id
    try {
        if (count === '' || duration === '') {
            next({
                name: "MissingCredentialsError",
                message: "Please supply both a name and description",
            });
        }
        else {
            const activityToRoutine = await addActivityToRoutine({ routineId, activityId, count, duration })
            res.send(activityToRoutine)
        }
    } catch (error) {
        next(error)
    }
});

// routinesRouter.post('/:routineId/activities', async (req, res, next) => {
//     const { routineId } = req.params
//     const { activityId, count, duration } = req.body
//     try {
//         if (count === '' || duration === '') {
//             next({
//                 name: "MissingCredentialsError",
//                 message: "Please supply both a name and description",
//             });
//         }
//         else {
//             const activityToRoutine = await addActivityToRoutine({ routineId, activityId, count, duration })
//             res.send(activityToRoutine)
//         }
//     } catch (error) {
//         next(error)
//     }
// });


routinesRouter.patch('/:routineId', requireUser, async (req, res, next) => {
    const { routineId } = req.params
    try {
        const updatedRoutine = await updateRoutine({ id: routineId, ...req.body })
        res.send(updatedRoutine)
    } catch (error) {
        next(error)
    }
});

routinesRouter.delete('/:routineId', requireUser, async (req, res, next) => {
    try {
        const ThrowOutRoutine = await destroyRoutine(req.params.routineId)
        res.send(ThrowOutRoutine)
    } catch (error) {
        next(error)
    }
});





module.exports = routinesRouter