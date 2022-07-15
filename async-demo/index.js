console.log('before');
getUser(1, getRepositories)
console.log('After');


function displayCommits(commits){
    console.log(commits);
}

function getRepositories(user){
    getRepositories(user.githubUsername, getCommits)
      
}

function getCommits(repos){
    getCommits(repo, displayCommits);
}

function getUser(id, callback){
    setTimeout(()=>{
        console.log('Reading a user from a database . . . ')
        callback({id:id, githubUsername:'mosh'})
    }, 2000)
}
//async await
async function displayCommits(){
    const user = await getUser(1);
    const repos = await getRepositories(user, githubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
}
displayCommits();













// console.log('Before');
// getUser(1, function(user){
//     console.log('user', user);
// });

// console.log(user);
// console.log('after');
// getRepositories(user.githubUsername(repos => {
// console.log('Repos' , repos)
// }));
// getCommits(repos(commits=> {

// }))
// function displayCommits(commits){
//     console.log(commits);
// }

function getUser(id, callback){
    setTimeout(() => {
        console.log('reading a user from the database...');
callback({ id: id, githubUsername: 'mosh' }), 2000})
    
return 1;
};
function getRepositories(username, callback){
    
}setTimeout(()=>{
    console.log('caling gitHub API...')
    callback['repo1', 'repo2', 'repo3'];
} ,2000)
 