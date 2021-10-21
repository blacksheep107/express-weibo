var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const uri = require('../../../common/common.json').url;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
router.post('/', function(req, res, next) {
    try {
        client.connect(err => {
            const collection = client.db("weibo").collection("users");
            collection.find({
                username: req.body.username,
                password: req.body.password
            }).skip(0).limit(1).toArray(function (err, result) {
                if (err)    throw err;
                console.log(result);
                if (result.length === 1) {
                    res.send({
                        code: 0,
                        msg: 'success',
                        data: result[0]
                    })
                } else{
                    res.send({
                        code: -1,
                        msg: 'fail',
                    });
                }
            })
        });
    }catch (err){
        res.send(err);
    }
});



module.exports = router;
