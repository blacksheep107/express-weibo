var express = require('express');
var router = express.Router();
const { MongoClient, ObjectId} = require('mongodb');
const uri = require('../../../common/common.json').url;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
router.post('/', function(req, res, next) {
    try {
        let postData = req.body;
        console.log(ObjectId(postData['post_user']))
        client.connect(err => {
            const users = client.db('weibo').collection('users');
            users.find({
                _id: ObjectId(postData['post_user'])
            }).skip(0).limit(1).toArray(function (err, result) {
                console.log(result)
                if (err) throw err;
                if (result.length === 0) {
                    res.send({
                        code: -1,
                        msg: 'no user'
                    });
                }else{
                    const collection = client.db("weibo").collection("posts");
                    collection.insertOne({
                        postData
                    }).then(result=>{
                        console.log(result);
                        res.send(result);
                    }).catch(err=>{
                        throw err;
                    })
                }
            })
        });
    }catch (err){
        res.send(err);
    }
});



module.exports = router;
