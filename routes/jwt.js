const crypto = require('crypto'),
    jwt = require('jsonwebtoken');
let token = jwt.sign(
    {
        name: 'chenman',
    },
    "test-token",
    {
        expiresIn: 60*60
    }
)
console.log(jwt.verify(token, 'test-token'));