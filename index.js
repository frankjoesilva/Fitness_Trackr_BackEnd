require('dotenv').config();
const PORT  = process.env.PORT || 3000;
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

server.use('/api/health', ( req, res ) => {
    res.send({message: "this server is feeling Good!"})
});

server.use((error, req, res, next) => {
  res.send(error);
});

server.get('*', (req, res, next) => {
  res.status(404).send({message : 'uh Oh!'});
});

server.use((error, req, res, next) => {
  res.status(500).send(error)
})

server.listen(PORT, () => {
    client.connect()
  console.log('The server is up on port', PORT)
});