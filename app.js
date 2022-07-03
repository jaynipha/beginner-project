// let x = 3 ^ 35

// console.log(x);

// function sayHello(name){
//     console.log('hello ' + name)
// }
// sayHello('jennifer')
// var message = 'jenny nwa'
// console.log(global.message);


// function sayHello(name){
//     window.console.log('omor eh' + name)
// }

const http = require ('http');
const server = http.createServer((req, res)=>
{
    if(req.url === '/'){
        res.write('hello world');
        res.end()

    }
    if(req.url ==='/api/courses' )
    {    res.write(JSON.stringify([1, 2, 3]));
         res.end();
    }

});
server.listen(3000);

console.log('listening on port 3000')








