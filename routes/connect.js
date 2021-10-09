var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:amanda1@cluster0.hrkg7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
router.get('/', function(req, res, next) {
    try {
        client.connect(err => {
            const collection = client.db("sample_analytics").collection("customers");
            // perform actions on the collection object
            collection.find().skip(0).limit(10).toArray(function (err, result) {
                if (err)    throw err;
                console.log(result);
                res.send(result);
            })
        });
    }catch (err){
        res.send(err);
    }
});



module.exports = router;
