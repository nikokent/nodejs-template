const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//TODO: Create all routes here!
const indexRouter = require('./routes/index'); 
const databaseExampleRouter = require('./routes/databaseExample'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle cross browser problems
app.all('/*', (req, res, next) => {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,X-Requested-With,Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Expose-Headers', 'total-rows');
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*ROUTES*/
//TODO: Add all routes here 
//first paramater is the path
//second parameter is the route object
app.use('/', indexRouter);
app.use('/index', indexRouter);               //note that these work like folder paths, for organization purpose
app.use('/another/example', indexRouter);     //it's standard to have this be the parent path to a group of related
                                              //end points, in this case I just reused indexRouter

app.use('/database/', databaseExampleRouter); //All end points from this path will be related to our database
                                

//0.0.0.0 is the localhost and runs on your chosen port
//server can be accessed from browser at 'localhost:<portnumber>' as the url
app.listen(port, '0.0.0.0', () => {
    console.log(`\nYour template server is up and running!`);
    console.log(`\nThings to try:`)
    console.log(`   visit localhost:${port}/ to view your server`);
    console.log(`   visit localhost:${port}/withParams?SomeRandomParameterName=Hi_I_Am_Niko`);
    console.log(`   use postman and send a post request to localhost:${port}/postExample`);
});

