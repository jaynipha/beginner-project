const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug') ('app:db')
const config = require('config');
const Joi = require('joi');
const courses = require('./routes/courses');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require ('./middleware/logger');
const route = require ('./routes/route');
const authenticate = require('./authenticate')
require('dotenv').config();
const app = express();

app.set('view engine','pug');
app.set('views', './views')

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get ('env')}`);


if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    startupDebugger('morgan enabled');

};
app.use(express.json());
app.use(logger);
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', route);


//CONFIGURATION
console.log('Application name:' + config.get('name'));
console.log('mail server' + config.get('mail.host'));
console.log('mail password' + config.get('mail.password'));


//app.use(authenticate);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`))


module.exports = router;