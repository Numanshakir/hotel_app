var express= require('express');
var db= require('./db');
var app = express();
require('dotenv').config();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
const port =process.env.port || 3000;





app.get('/', function(req, res){
    if(req) req.statusCode = 200;
    res.send({
        message: 'Welcome to Node app'

    });
});

const personRouter =require('./routes/personroutes');
app.use('/person',personRouter);
const menuRouter =require('./routes/menuRoutes');
app.use('/menuItem',menuRouter);



app.listen(port,function () {   
    console.log('Server started on port 3000');
});