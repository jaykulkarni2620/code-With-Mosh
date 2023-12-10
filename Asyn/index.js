console.log("Before");

getUser(1, function(user) {
    getRepositories( user.gitHubUsername, (userRepo) => {
        console.log("userRepo", userRepo);
        })
    // console.log("getuser", user);
});





console.log("After");


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