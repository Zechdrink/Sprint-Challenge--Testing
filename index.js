const server = require('./api/server');

server.listen(5000, () => {
    console.log(`\n** server is running on http://localhost:5000 **\n`)
});