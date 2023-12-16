const mongoose =  require('mongoose');

mongoose.connect('mongodb://localhost:27017/user')
.then(() => console.log("connected to mongoose"))
.catch(error => console.log("Could not connect to MongoDB...", error));


const userSchema = new mongoose.Schema({
    name: String,
    lname: String,
});

//model
const User = mongoose.model('user', userSchema);

async function createUser(id) {
    try{

        //
        // const newUser = new User({
        //     name: "tushar",
        //     lname: "pol",
        // });
    
        // const result = await newUser.save();
        // console.log("result",result);

       // 1st method Update a user based on a specific condition
        //  const updateUser = await User.updateOne(
        // { _id: id },
        // { $set: { name: "jay", lname: "kulkarni" } }, // Update fields
        //  );
        // console.log(updateUser);

        // 2nd method 
        const update_User = await User.findById(id) 
        if(!update_User) return;
        //updating
        
        update_User.name = "veeru";
        update_User.lname =  "sawant";
        
       const result = await update_User.save();
       console.log(update_User);

        // // Delete a particular user from database
        // const deleteUser = await User.deleteOne();
        // console.log("deleteUser", deleteUser);

        // if (deleteResult.deletedCount > 0) {
        //     console.log("User deleted successfully");
        // } else {
        //     console.log("User not found or not deleted");
        // }


    
        // // To display data from the database
        // const usersFromDB = await User.find();
        // console.log("Users in the database:", usersFromDB);

        
        // // To display particular data from the database
        // const particularUser = await User.findById("657c09ef9ee83bbebff1839e");
        // console.log("findparticularUser", particularUser);
    
    } catch (error) {
        console.error("Error:", error.message);
    }


}

createUser("657c09ef9ee83bbebff1839e");

