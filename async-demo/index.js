console.log('Before');
getUser(1, function(user){
    console.log('user', user);
});
console.log(user);
console.log('after');

function getUser(id, callback){
    setTimeout(() => {
        console.log('reading a user from the database...');
    return { id: id, githubUsername: 'mosh' }}, 2000)
    
    return 1;
};
