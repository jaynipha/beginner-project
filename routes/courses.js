const express = require('express');
const router= express.Router();
const courses = [
    {id: 1, title: 'Math'}, 
    {id: 2, title: 'Geography'}, 
    {id: 3, title: 'English'},
    {id: 4, title: 'physics'},
    {id: 5, title: 'music'},
    {id: 6, title: 'history'},
    {id: 7, title: 'biology'},
];
    
 router.get('/', (req, res)=>{
    try {
        res.status(200).json({status: true, data: courses});
    } catch (error) {
        res.status(400).json({status: false, message: 'Oooops, something went wrong!!!'});
    }
});

//request parameter
router.get('/:id', ( req, res ) => {
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
router.get('/api/title', ( req, res ) => {
    const data = courses.find((item) => item.id === parseInt(req.query.id));
    if(!data) res.status(404).send('the course with the given id was not found');
    res.send(data);    
});

//POST REQUEST
router.post('/api/courses', (req , res) => {

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

        router.put('/:id', ( req, res ) => {
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

 data.name = req.body.name
 res.send(data);


     function validateData(data){
        const schema = {
        name:Joistring().min(3).required()
    };
    return Joivalidate(data, schema)
    };

});
 router.delete('/:id',(req, res)=>{
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
