const express = require('express');
const server = express();
const gamesRouter = require('../helpers/game-router');
server.use(express.json());

server.use('/games', gamesRouter);

server.get('/', (req, res, next) => {
    res.json('Lets do this')
})


module.exports = server;