var express= require('express');
var db= require('./db');
var app = express();
//Call the dotenv file
require('dotenv').config();

const passport =require("./auth.js");




var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
const port =process.env.port || 3000;


///Middleware  to Log time for request
const logRequest = (req, res, next) => {
    console.log(`[  ${new Date().toLocaleString()} ${req.method} ${req.originalUrl}  ]`);
    next();
};
 ///Applied the middleware to whole app
app.use(logRequest);




    app.use(passport.initialize());
var localAuthMiddleware = passport.authenticate('local',{session:false  })

///Routes 
app.get('/', function(req, res){

    res.send({
        message: 'Welcome to Node app'
    });
});

//Calling person routes

const personRouter =require('./routes/personroutes');
app.use('/person',personRouter);

//Calling menu routes
const menuRouter =require('./routes/menuRoutes');
app.use('/menuItem',menuRouter);



app.listen(port,function () {   
    console.log('Server started on port 3000');
});