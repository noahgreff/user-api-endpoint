/**
 * Loading .env config file.
 */

require('custom-env').env();


/**
 * Include all dependencies
 */

const express = require("express");
const parser = require("body-parser");
const mongoose = require('./util/connect');


/**
 * Initializing express server instance and include body-parser,
 * then export it as global varable along with mongoose
 */

const server = express();
server.disable("x-powered-by");
server.use(parser.json());

module.exports = server;
module.exports.mongoose = mongoose;


/**
 * Connection feedback, optional
 */

server.listen(process.env.PORT || 4545, console.log("\nEndpoint Active..."));
server.get('/', (req, res) => res.json({
    message: "USER API Endpoint",
}));


/**
 * Add any additional api routes from api folder
 */

server.use('/user', require('./api/route')); // User API


/**
 * Automatically send error code 404 for unmatched links
 */

server.use(function(req, res) {
    res.sendStatus(404);
});


/**
 * All api routes DEBUG
 */

const listEndpoints = require("express-list-endpoints");
//console.log(listEndpoints(server));