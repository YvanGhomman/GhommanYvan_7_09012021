const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const path = require('path');

const helmet = require('helmet');
/* require('dotenv').config(); */


const userRoutes = require("./routes/user.routes.js");
const articleRoutes = require("./routes/article.routes.js");
const articleComments = require("./routes/comment.routes.js");


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Request-Headers, Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());
app.disable('x-powered-by');

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use('/user', userRoutes);
app.use('/article', articleRoutes);
app.use('/comment', articleComments);


module.exports = app;