console.log('Before');
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     })
//   })
// });

//Promise-based approach
//   getUser(1)
//      .then(user => getRepositories(user.gitHubUsername))
//      .then(userRepo => getCommits(userRepo[0]))
//      .then(commits => console.log("commits",commits))
//      .catch(error => console.log("ERROR:",error));

//Asyc and Await
async function displaCommits() {
    try{
    const user = await getUser(1);
    const repo =  await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repo[0]);
    console.log("commits",commits);
    } catch(error){
        console.log("ERROR:",error.message);
    }
}

displaCommits();

console.log('After');

function getUser(id) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'jay' });
          }, 2000);
    });
}

function getRepositories(username) {
    //replacing callback with promises
    return new Promise((resolve,reject) => {
  setTimeout(() => {
    console.log('Calling GitHub API...');
    // resolve(['repo1', 'repo2', 'repo3']);
    reject( new Error("Beacause something went wrong"));
         }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve,reject) => {
  setTimeout(() => {
    console.log('Calling GitHub API...');
    resolve(['commit']);
        }, 2000);
    });
}