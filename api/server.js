const express = require('express');
const server = express();
server.use(express.json());


server.get('/', (req, res, next) => {
    res.json('Lets do this')
})


module.exports = server;