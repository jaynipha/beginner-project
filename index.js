const express = require('express');
const res = require('express/lib/response');
require('dotenv').config()
const app = express();

app.use(express.json());

const courses = [{id: 1, title: 'Math'}, 
                {id: 2, title: 'Geography'}, 
                {id: 3, title: 'English'}];

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
app.get('/api/title', (req, res )=>{
    const data = courses.find((item) => item.id === parseInt(req.query.id));
    res.send(data);
    if(!courses) res.status(404).send('the course was not found');
    res.send(course);
});
app.post('/api/courses', (req , res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);   
})

const port = process.env.PORT || 3000 
app.listen(port, () => console.log(`listening on port ${port}...`))



// app.post();
// app.put();
// app.delete()

