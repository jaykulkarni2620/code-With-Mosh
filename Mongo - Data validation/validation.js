const mongoose =  require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground')
.then(() => console.log("connected to mongoose"))
.catch(error => console.log("Could not connect to MongoDB...", error));

const courseSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        //Built in validators
        minlength: 5,
        maxlength: 255,
    },
    category: {
        type:String,
        //Built in validators
        enum: ['web','mobile','network'],
        require: true,
        //Schema type option
        // lowercase: true,
        // uppercase: true,
        // trim: true,
    },
    author: String,
    //Custom validation
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: "A course at least one tags."
        },

        // Async Validators
        isAsync: true,
        // validate: {
        //     validator: function(v, callback) {
        //         setTimeout(() => {
        //         const result =  v && v.length > 0;
        //         callback(result);
        //         },4000);
        //     },
        //     message: "A course at least one tags."
        // }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number, 
        require: function() { return this.isPublished;},
        min:10,
        max:50,
        //Schema type option
        get: v => Math.round(v),
        set: v => Math.round(v),
    }
});

//model
const Course = mongoose.model('Course',courseSchema);

async function createCourse() {

    const course = new Course({
        name: "Angular-js",
        author: "jay",
        tags: ['frontend'],
        isPublished:true,
        category: 'web',
        price: 15.8,
    });

        try{
            const result = await course.save();
            console.log("result",result);
        } catch (error) {
            console.log("Error:", error );
        };
};
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