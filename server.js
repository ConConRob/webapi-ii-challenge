const express = require('express');
const routesPosts = require('./routesPosts')

const server = express();

server.use('/api/posts', routesPosts)

module.exports = server;