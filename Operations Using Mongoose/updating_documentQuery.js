
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground')
.then(() => console.log("connected to mongoose"))
.catch(error => console.log("Could not connect to MongoDB...", error));

// Schemas 

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
});

//model
const Course = mongoose.model('Course',courseSchema);

//saving document 

async function createCourse() {

    const course = new Course({
        name: "React-js",
        author: "jay",
        tags: ["react-js","frontend"],
        isPublished:true,
    });

    const result = await course.save();
    // console.log("result",result);

}

// createCourse()

// async function getCourses(){
//    const courses = Course.find();
//    console.log(courses);
// }

//with filter 

async function getCourses(){
    const courses = await Course
    // .find({ author:"jay", isPublished:true })

    // limits 
    .limit(10)
    //sort ascending order(1) and decending order(-1)
    .sort({name: 1 })
    // select 
    .select({ name: 1, tags: 1 });
    console.log(courses);
 };

// getCourses();

//---------------------------------commparison query ------------------------

// eq(equal)
// ne(not equal)
// gt(greater than)
// gte(greater than equal to )
// lt(less than)
// lte(less than equal to)
// in 
// nin(not in )

async function comparison(){
    const courses = await Course
 // greater than 10$
 .find( { price: { $gt: 10 } })

 // greater than 10$ less than 20$
 .find( { price: { $gt: 10, $lt: 20 } })

 // either 10$,15$ and 50$
 .find( { price:{ $in: [ 10, 15, 50] } })
};

// comparison();


//---------------------------------Logical Query Operators 

//or 
//and

async function getCourses(){
    const courses = await Course
//    .find({ author:"jay", isPublished:true })
    .find()
    .or( [{ author:'jay'},{isPublished: true}])
    .and( [{ author:'jay'},{isPublished: true}])
    // limits 
    .limit(10)
    //sort ascending order(1) and decending order(-1)
    .sort({name: 1 })
    // select 
    .select({ name: 1, tags: 1 });
    console.log(courses);
 };

// getCourses();

//-------------------------Regular Expression

async function getCourses(){
      //for pagination 
      const pageNumber = 2;
      const pageSize =10;
    
    const courses = await Course

//    .find({ author:"jay", isPublished:true })
   
    // Only get course which author "Jay" not get Jaykul or Jayshsjk
    // Start With Jay
    .find({ author: /^jay/})

    // Ends with 
    .find({ author: /kulkarni$/})

    //Contains Mosh 
    .find({author: /.*jay*>./})

    // limits 
    .limit(10)

    //sort ascending order(1) and decending order(-1)
    .sort({name: 1 })
    
    // select 
    .select({ name: 1, tags: 1 })
   
    
    //pagination 
    .skip((pagenumber -1) * pageSize)
    .limit(pageSize)
    //count how many course there 
    .count()
    console.log(courses);
 };

// getCourses();

async function updatingData(id){
   const course = await Course.findById(id) 
    if(!course) return;
    //updating
    course.isPublished = false;
    course.author = "author author";
    
   const result = await course.save();
   console.log(result);



    //another approch 
    // course.set({
    //     isPublished: true,
    //     auther:'author author';
    // })

}

updatingData("6578550f97162d1222a385db");