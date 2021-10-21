var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const uri = require('../../../common/common.json').url;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
router.get('/', function(req, res, next) {
    try {
        client.connect(err => {
            const collection = client.db("weibo").collection("posts");
            collection.find().skip(0).limit(10).toArray(function (err, result) {
                if (err)    throw err;
                res.send(result);
            })
        });
    }catch (err){
        res.send(err);
    }
});



module.exports = router;
