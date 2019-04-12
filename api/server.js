const express = require('express');
const server = express();
server.use(express.json());


server.get('/', (req, res, next) => {
    res.send('Lets do this')
})


module.exports = server;