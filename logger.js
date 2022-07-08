function log (req, res, next){
    console.log('logging...')
    next();
};
module.exports = log;

function authenticate (req, res, next){
    console.log('authenticating...')
    next();
};
module.exports = authenticate;