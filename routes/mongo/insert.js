var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const uri = require('../../common/common.json').url;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
router.get('/', function(req, res, next) {
    try {
        client.connect(err => {
            const collection = client.db("sample_analytics").collection("customers");
            collection.insertOne({
                title:'test',
                des: 'as'
            }).then(result=>{
                console.log(result);
                res.send(result);
            }).catch(err=>{
                throw err;
            })
        });
    }catch (err){
        res.send(err);
    }
});



module.exports = router;
