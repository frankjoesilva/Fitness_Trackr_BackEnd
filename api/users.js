const express = require('express');
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env
const usersRouter = express.Router();
const { requireUser } = require('./utils')
const { createUser, getUserByUsername, getUser } = require('../db/users');
const { getPublicRoutinesByUser, getAllRoutinesByUser } = require('../db/routines')

usersRouter.get('/routines', async (req, res, next) => {
  const { username } = req.user
  try {
    const allRoutines = await getAllRoutinesByUser({ username })
    res.send(allRoutines)

  } catch (error) {
    next(error)
  }
})

usersRouter.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const users = await getUserByUsername(username);
    if (users) {
      res.send({ message: 'A User by that Username already exists' });
    }
    else if (username.length <= 6 || password.length <= 8) {
      res.send({ message: 'Username or Password too Short!' });
    }
    else {
      const user = await createUser({ username, password });
      const token = jwt.sign(user, JWT_SECRET);
      res.send({ message: "User Created", user: user, token });
      return user
    }
  } catch (error) {
    next(error)
  }
});

usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      next({ name: 'IncorrectCredentialsError', message: 'Username or password is incorrect' });
      return
    }
    const user = await getUser({ username, password });
    if (user) {
      const token = jwt.sign(user, JWT_SECRET);
      res.send({ message: "you're logged in!", token });
      return user;
    } else {
      next({ name: 'IncorrectCredentialsError', message: 'Username or password is incorrect' });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/:username/routines', async (req, res, next) => {
  try {
    const { username } = req.params;
    if (req.user.username === username) {
      const allRoutines = await getAllRoutinesByUser({ username })
      return res.send(allRoutines)
    }
    const getUsername = await getPublicRoutinesByUser({ username })
    res.send(getUsername)
  } catch ({ name, message }) {
    next(error)
  }
});

usersRouter.get('/me', requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  }
  catch ({ name, message }) {
    next({ name, message });
  }
});



module.exports = usersRouter;

