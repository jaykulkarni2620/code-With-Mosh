const mongoose =  require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground')
.then(() => console.log("connected to mongoose"))
.catch(error => console.log("Could not connect to MongoDB...", error));

const courseSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
});

//model
const Course = mongoose.model('Course',courseSchema);

async function createCourse() {

    const course = new Course({
        // name: "Angular-js",
        author: "jay",
        tags: ["Angular-js","frontend"],
        isPublished:true,
    });

    const result = await course.save();
    console.log("result",result);

}
createCourse();

// async function updatingData(id){
//     // const result = await Course.update({_id : id }, {
//         const course = await Course.findByIdAndUpdate(id, {
//         $set: {
//             author: "jack",
//             isPublished: true
//         }
//     });
//     console.log(course);
 
 
 
//      //another approch 
//      // course.set({
//      //     isPublished: true,
//      //     auther:'author author';
//      // })
 
//  }
 
//  async function removeCourse(id){
//    const result = await Course.deleteOne({ _id : id})
//    console.log(result);

// }



//  removeCourse("65793821a7847084e4f3faad");