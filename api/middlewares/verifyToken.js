const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied.');
    try {
        var cookie = getcookie(req);
        console.log(cookie);
        const verified = jwt.verify(token, process.env.PRIVATE_TOKEN);
        console.log(verified);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

function getcookie(req) {
    var cookie = req.headers.cookie;
    return cookie?cookie.split('; '):null;
  }