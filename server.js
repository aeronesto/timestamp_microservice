'use strict';

// import express, body-parser, routes and api.
var express = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var routes = require('./app/routes/index.js');
var api = require('./app/api/timestamp.js');
const path = require('path');

// set the headers: this will let us get the data from a POST
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // allow any origin to access the resource.
    res.header("Access-Control-Allow-Methods", "GET"); //  Specify which methods are allowed
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // enable CORS
    next();
  });

// body parser middleware to handle URL parameter and JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

// mounts the static files in directory to serve to specified path 
app.use(express.static(path.join(__dirname + '/public')));
app.use('/views', express.static(process.cwd() + '/views'));
    
var port = process.env.PORT || 8080; // set our port to value stored in .env file
    
// The format follows as, alias to use for real path, also allows permission to such path.
//app.use('/api', express.static(process.cwd() + '/app/api'));

routes(app);
api(app);
    
app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
});