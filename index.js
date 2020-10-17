require('dotenv').config();
const { PORT = 3000 } = process.env
const cors = require('cors');
const express = require('express');
const server = express();

const morgan = require('morgan');
server.use(morgan('dev'));

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(cors());

const apiRouter = require('./api');
server.use('/api', apiRouter);

const { client } = require('./db');


server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");
  next();
});

server.get('/api/health', ( req, res ) => {
    res.send({message: "Server is Healthy!"})
});

server.use((error, req, res, next) => {
  res.send(error);
});

server.get('*', (req, res, next) => {
  res.status(404).send({message : 'Error 404 not found!'});
});

server.use((error, req, res, next) => {
  res.status(500).send(error)
})

server.use((error, req, res, next) => {
  console.log('error', error)
  res.send(error)
})

server.listen(PORT, () => {
    client.connect()
  console.log('The server is up on port', PORT)
});