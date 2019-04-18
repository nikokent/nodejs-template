var express = require('express'); // express is the library for our server
var router = express.Router();    // router is how we access the server at a specified url path
const moment = require('moment');

/* GET index response */
//accessed at 'localhost:<port>'
router.get('/', async (req, res) => {
    const resObj = {
        Server_Status: "Healthy",
        Time: moment().format('MM/DD/YYYY HH:mm:ss a')
    }
    res.send(resObj);
});

/* GET index response with path */
//accessed at 'localhost:<port>/otherIndex'
router.get('/otherIndex', async (req, res) => {
    res.send("This is the other Index response");
});

/* GET index response with path */
//accessed at 'localhost:<port>/withParams?SomeRandomParameterName=<literally anything you want to type>'
router.get('/withParams', async (req, res) => {
    res.send(`Value for parameter 'SomeRandomParameterName = ${req.query.SomeRandomParameterName}'`);
});

router.post('/postExample', async (req, res) => {
    const jsonObj = {
        Description: "This is just a random example of json response with post and returning a body",
        Value: req.body
    }
    console.log(`A post request was recieved with data:`);
    console.log(req.body);
    res.send(jsonObj);
});

module.exports = router;