const express = require('express');
const moment = require('moment');
const { executeQuery } = require('../lib/db');
const router = express.Router();


//This assumes you have setup the db.js fields to connect to your db
//example:  localhost:<port>/db/insert?firstName=<someName>&lastName=<someName>&age=<some age>
router.get('/insert', async (req, res) => {

  //Tip! Queries tend to be long, so go to menu at top of vs code View > Toggle Word Wrap
  const query = `INSERT INTO my_items (firstName, lastName, age) VALUES ('${req.query.firstName}', '${req.query.lastName}', '${req.query.age}')`; 

  const results = await executeQuery(query); //Executes query

  res.send({
      status: 'Successful',
      description: 'Item has been inserted!'
  });

});

//This assumes you have setup the db.js fields to connect to your db
//example:  localhost:<port>/db/selectall
router.get('/selectall', async (req, res) => {
    
    let payload = [];
  
    //Tip! Queries tend to be long, so go to menu at top of vs code View > Toggle Word Wrap
    const query = `SELECT * FROM my_items`; 
  
    const results = await executeQuery(query); //results is an array of all rows from table

    //For our fake example results has objects of (firstName, lastName, age)
    //Here's an example of adding another key to each object before returning array of objects
    results.map(item => {
        item['Time'] = moment().format('MM/DD/YYYY HH:mm:ss a');
        payload.push(item);
    })
  
    res.send(payload);
    
  });

module.exports = router;