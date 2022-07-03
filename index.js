const Joi = require('joi');

const express = require('express');

const res = require('express/lib/response');
require('dotenv').config()
const app = express();

app.use(express.json());

const courses = [
    {id: 1, title: 'Math'}, 
    {id: 2, title: 'Geography'}, 
    {id: 3, title: 'English'}
];



app.get('/',(req, res)=>{
    res.send('hello world');
});

app.get('/api/courses',(req, res)=>{
    res.send(courses);
});

//request parameter
app.get('/api/courses/:id', (req, res )=>{
    const data = courses.find((item) => item.id === parseInt(req.params.id));
    res.send(data);
});

//request queries
app.get('/api/title', ( req, res ) => {
    const data = courses.find((item) => item.id === parseInt(req.query.id));

    if(!data) res.status(404).send({
        status: false, 
        message: 'the course was not found'
    });

    res.send({ status: true, data });
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

const port = process.env.PORT || 3000 
app.listen(port, () => console.log(`listening on port ${port}...`))


// app.put();
// app.delete()

