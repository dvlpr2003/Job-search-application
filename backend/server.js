const express = require('express');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods:POST,GET,OPTIONS,PUT,DELETE');
header('Access-Control-Allow-Headers: Content-Type,X-Auth-Token,Origin,Authorization');

// Middleware is a software that acts as an intermediary between 
// two applications or services to facilitate their communication.
// body-parser gets data from body
const bodyParser = require('body-parser');

// cross origin resource sharing: enables scripts running on a 
// browser client to interact with resources from a different origin/domain
// which is otherwise blocked by same origin policy for Js
const cors = require('cors');

// mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js
// manages relationships between data, provides schema validation, 
// translate between objects in code and the representation of those objects in MongoDB
const mongoose = require('mongoose');

const passport = require("passport");

const app = express();

const PORT = 3000;
const DB_NAME = "JobsPlanet"

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/users.routes");
var JobRouter = require("./routes/job.routes");
var ApplicationRouter = require("./routes/application.routes");

app.use(cors({
    origin:"https://h-aglx.onrender.com",
    credentials:true
    
}


));
// fun
// app.use((req,res, next)=>{
//     res.header('Access-Control-Allow-Origin','*');
//     res.header(
//         'Access-Control-Allow-Headers','Origin ,X-Requested-With,Content-Type, Access,Authorization'
//     );

//     if(req.Method==='OPTIONS'){
//         req.header('Access-Control-Allow-Methods','POST,PUT,PUSH,PATCH,DELETE,GET');
//         return res.status(200).json({})
//     }

//     next()
// })
// fun
// Body-Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
// To localhost
mongoose.connect('mongodb+srv://dvlpr2003:<WLRSxEEuD92nc13t>@cluster0.fmrgmxo.mongodb.net/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/job", JobRouter);
app.use("/application", ApplicationRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
