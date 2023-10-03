// contains the express code
let express = require('express');
let cors = require("cors");

// router
const router = express.Router();

//passport and LocalStrategy and express session
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

//jsonwebtoken and uuid
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// hashing functions
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Generate a random secret key
const secretkey = crypto.randomBytes(32).toString('hex');
//console.log(secretkey);


// for the middleware
const bodyParser = require('body-parser')

// mongoose
const mongoose = require("mongoose");

// to load html in express
var cons = require('consolidate');
const path = require('path')

// this is to get the database configuration from .env file
require('dotenv').config()

// calling model to connect to mongoose
const model = require('./public/model/model.js');

// Instantiate express application
let app = express();

app.use(cors())

app.use(bodyParser.json());

app.use(session({
    genid: uuidv4,
    resave: false,
    saveUninitialized: false,
    // cookie: {secure: true},
    secret: secretkey
}));


// configuration for views
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
passport.deserializeUser(function (id, done) {
    console.log('Deserialize user called.');
    return done(null, { firstName: 'Foo', lastName: 'Bar' });
});


// authenticated user must be serialized to the session and deserialized when subsequent requests are made
passport.serializeUser(model.User.serializeUser());
passport.deserializeUser(model.User.deserializeUser());


// placeholder data
let usernames = ['admin', 'bsmith'];
function userExists(toFind) {
    for (let i = 0; i < usernames.length; i++) {
        if (usernames[i] === toFind) {
            return true;
        }
    }

    return false;
}

// signup post req
app.post("/signup", function (req, res) {
    model.User.register(new model.User({ email: req.body.email, username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            res.json({ success: false, message: "Your account could not be saved. Error: " + err });
        }
        else {
            res.json({ success: true, message: "Successfully Signed up" });
        }
    });
});

// passport LocalStrategy authentication 
passport.use(new LocalStrategy(model.User.authenticate()));

// login post req
app.post("/login", function (req, res) {
    if (!req.body.username) {
        res.json({ success: false, message: "Username was not given" })
    }
    else if (!req.body.password) {
        res.json({ success: false, message: "Password was not given" })
    }
    else {
        passport.authenticate("local", function (err, user, info) {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                if (!user) {
                    res.json({ success: false, message: "Username or Password is Incorrect" });
                }
                else {
                    const token = jwt.sign({ userId: user._id, username: user.username }, secretkey, { expiresIn: "24h" });
                    res.json({ success: true, message: "Authentication successful", token: token });                
                }
            }
        })(req, res);
    }
});

// login fail page
app.get('/loginfail.html', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/views/loginfail.html'));
});

// Handling non matching request from the client
// app.use((req, res, next) => {
//     res.status(404).send(
//         "<h1>Page not found on the server. Please check your url.</h1>")
// });

// logout - signout
app.get('/logout', function (request, response) {
    request.session.username = '';
    response.redirect('/');
});

//makepost req
app.post("/makepost", async function (req, res) {
    try {

        const date = new Date(); 
        const monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
          ];
        const month = monthNames[date.getMonth()];
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        const fixedDate = `${month} ${day}, ${year}`;

        const postData = new model.Post({ 
            title: req.body.title, 
            bodytext: req.body.bodytext,
            date: fixedDate,
            username: req.body.username
        });
        await postData.save();
        res.json({ success: true, message: "Post created successfully" });
    } catch (error) {
        console.error("Error creating post:", error);
        res.json({ success: false, message: "Error creating post" });
    }
});

//fetch posts data 
//app.get("/getAllPost", async function (req, res){ //Do localhost:3500/getAllPost to see the data
app.get("/CreateBlog", async function (req, res){ 
    try{ 
        const allPost = await model.Post.find({});
        res.send({status:"ok", data:allPost});
        //console.log(posts);
        //res.json(posts);
    }catch (error){ 
        console.log(error);
    }
});

//Update posts 
app.put("/modifyPost/:id", async function (req, res){ 
    try{ 
        const post = await model.Post.findOne({_id: req.params.id}); 

        if (!post){ 
            res.json({success: false, message: "Post not found"});    
        } else { 
            post.text = req.body.text;
            post.bodytext = req.body.bodytext; 
            await post.save(); 
            res.json({success: true, message: "Post updated successfully"}); 
        }
    } catch (error){ 
        console.error("Error updating post: ", error); 
        res.json({success: false, message: "Error updating post"});
    }
}); 

//Delete posts
app.delete("/deletePost/:id", async function (req, res){ 
    try{ 
        const post = await model.Post.deleteOne({_id: req.params.id});
        
        if (post.deleteCount == 0){ 
            res.json({success: false, message: "Post not found"}); 
        } else { 
            res.json({success: true, message: "Post deleted successfully"});
        }
    } catch (error){ 
        console.error("Error updating post", error); 
        res.json({success: false, message: "Error updating post"});
    }
})

//fetch posts data 
//app.get("/getAllPost", async function (req, res){ //Do localhost:3500/getAllPost to see the data
app.get("/getProfile", async function (req, res){ 
    try{ 
        const allPost = await model.UserProfile.find({});
        res.send({status:"ok", data:allPost});
        //console.log(posts);
        //res.json(posts);
    }catch (error){ 
        console.log(error);
    }
});

// aboutme post req
app.post("/aboutme", async function (req, res) {
    try {
        const profileData = new model.UserProfile({ 
            username : req.body.username,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email: req.body.email,
            age : req.body.age,
            biotext: req.body.biotext 
        });
        await profileData.save();
        res.json({ success: true, message: "Profile created successfully" });
    } catch (error) {
        console.error("Error creating profile:", error);
        res.json({ success: false, message: "Error creating profile" });
    }
});

// router
app.use('/api', router);

// Setup a static server for all files in /public
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// initialize the passport
app.use(passport.initialize());
app.use(passport.session());

// Use environment variable specified at command line, or if none provided, 3000 default
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log(`Listening for requests on port ${app.get('port')}.`);
});