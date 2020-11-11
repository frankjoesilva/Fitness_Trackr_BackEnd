const express = require('express');
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env
const usersRouter = express.Router();
const { requireUser } = require('./utils')
const { createUser, getUserByUsername, getUser } = require('../db/users');
const { getPublicRoutinesByUser } = require('../db/routines')



usersRouter.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const users = await getUserByUsername(username);
    if (users) {
      res.send({ message: 'A user by that username already exists' });
    }
    else if (username.length <= 6 || password.length <= 8) {
      res.send({ message: 'Username or Password Too Short, username must be 6 characters or more and password should have a minimum of 8!' });
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
  const { username } = req.params;
  const getUsername = await getPublicRoutinesByUser({ username })
  try {
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

