const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/Blogo?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// Create Schema instance for users collection. 
// This will be for users of the system
let userSchema = new Schema({
    username: {type: String, unique: false},
    email: String,
    password: String
}, {
    collection: 'Users'
});

// plugin for passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

// Here we export our module (node.js) to make it available in a different file (savingdata.js)
module.exports.User = mongoose.model('User', userSchema);
  
//Create Scheme instance for posts collection 
let postSchema = new Schema({ 
    title: String, 
    bodytext: String,
    date: String,
    username: String
}, {
    collection: 'Posts'
});

//plugin for pass-port-local-mongoose
//postSchema.plugin(passportLocalMongoose); 

module.exports.Post = mongoose.model('Post', postSchema);

//Create Scheme instance for user profile collection 
let userProfileSchema = new Schema({ 
  username: {type: String, unique:false},
  firstname: String,
  lastname: String, 
  email: String,
  age: Number,
  biotext: String
}, {
  collection: 'UserProfiles'
}); 

module.exports.UserProfile = mongoose.model('UserProfile', userProfileSchema);
