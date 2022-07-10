const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug') ('app:db')
const config = require('config');
const Joi = require('joi');

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require ('./logger');
const authenticate = require('./authenticate')
require('dotenv').config();
const app = express();


// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get ('env')}`);


if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    startupDebugger('morgan enabled');

};
app.use(express.json());
app.use(logger);
app.use(helmet());


//CONFIGURATION
console.log('Application name:' + config.get('name'));
console.log('mail server' + config.get('mail.host'));
console.log('mail password' + config.get('mail.password'));







//app.use(authenticate);

const courses = [
    {id: 1, title: 'Math'}, 
    {id: 2, title: 'Geography'}, 
    {id: 3, title: 'English'},
    {id: 4, title: 'physics'},
    {id: 5, title: 'music'},
    {id: 6, title: 'history'},
    {id: 7, title: 'biology'},
];


    app.get('/', (req, res) =>{
    res.status(201).json({status: true, message: 'Hello World'});
});

   app.get('/api/courses', (req, res)=>{
    try {
        res.status(200).json({status: true, data: courses});
    } catch (error) {
        res.status(400).json({status: false, message: 'Oooops, something went wrong!!!'});
    }
});

//request parameter
 app.get('/api/courses/:id', ( req, res ) => {
    try {
        const data = courses.find((item) => item.id === parseInt(req.params.id));
        if(!data) {
            res.status(404).send({
                status: false, 
                message: 'the course was not found'
            });
         }
    
        res.send({ status: true, data });
    } catch (error) {
        
    }
  
});

//request queries
app.get('/api/title', ( req, res ) => {
    const data = courses.find((item) => item.id === parseInt(req.query.id));
    if(!data) res.status(404).send('the course with the given id was not found');
    res.send(data);    
});

//POST REQUEST
app.post('/api/courses', (req , res) => {

    //JOI VALIDATION SCHEMA SHAPE
    const schema ={
        name: Joi.string().min(3).max(100).required()
    }
    //VALIDATE REQUEST BODY
    const result = Joi.object().keys(schema).validate({...req.body});

    const name = req.body.name;
    //VALIDATION CHECK
    if(!!result.error) {
        const message = result.error.details.map(i => i.message).join(',');

           return res.status(400).send({
            status: false, 
            message: message
            
            }); 
    }  
    //DATABASE OBJECT 
    const course = {
        id: courses.length + 1,
        name: name
    };
  //SEND OBJECT (PAYLOAD) TO THE DATABASE
    courses.push(course);

    //SERVER RESPONSE
    res.status(201).send({status: true, courses});   
})

        app.put('/api/courses/:id', ( req, res ) => {
        const data = courses.find((item) => item.id === parseInt(req.params.id));
        if(!data) res.status(404).send('the course with the given id was not found');
        //const {error} = validateData(req, body); 
        res.status(200).json({status: true , message: data});
   //look up the course
    //if not existing, return 404


   //validate
   //if invalid, return 400- bad request
   const schema ={
    name: Joi.string().min(3).max(100).required()
}
    const result = Joi.object().keys(schema).validate({...req.body});
    const name = req.body.name;
    if(!!result.error) {
    const message = result.error.details.map(i => i.message).join(',');

        return res.status(400).send({
             status: false, 
             message: message
            }); 
    }  
   //update course
   //return the updated course
data.name = req.body.name
res.send(data);


     function validateData(data){
        const schema = {
        name:Joistring().min(3).required()
    };
    return Joivalidate(data, schema)
    };

});


// app.put();
 app.delete('/api/courses/:id',(req, res)=>{
     //look up the course
     //if it doesn't exist, 404
     const data = courses.find((item) => item.id === parseInt(req.params.id));
     if(!data) res.status(404).send('the course with the given id was not found');

     //delete
     const index = courses.indexOf(data);
     courses.splice(index, 1)
     res.status(200).send(data);
     //return the same course
 });

 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`))

