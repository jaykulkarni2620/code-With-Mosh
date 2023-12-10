console.log("Before");

    getUser(1, getRepositories);

console.log("After");


//NAMED FUNCTION RESCUE
function getRepositories(user){
    getRepositories( user.gitHubUsername, getCommmits)
};

function getCommmits(userRepo){
    getCommits(repo, displyCommits);
};

function displyCommits(commits){
    console.log(commits);
};


function getUser(id , callback){
    setTimeout(()=> {
        console.log("reading the user form the database...");
       //user name dil call back la as argument then user madhun .gitHubUsername ghetoy 
        callback({ id: id , gitHubUsername : "jay"});
    }, 2000);

    // return 2;
}

// as exercise

function getRepositories (username , callback) {

    setTimeout(()=> {
        console.log("Calling Github API...");
        callback([ "repo1", "repo2", "repo3"]);
    }, 2000);
};