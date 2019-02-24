const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
// const ip = process.env.IP || '0.0.0.0';

const server = http.createServer(app.app);

server.listen(port);
