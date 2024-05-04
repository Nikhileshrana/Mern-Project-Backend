const express = require("express");
const port = 3000;
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // Parse JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// DATABASE SETUP

const mongoose =  require("mongoose");
const url = "mongodb+srv://nikhileshrana:Brave222@cluster0.kezpsvp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url);

const userlogin = mongoose.Schema({
    username : String , 
    name : String , 
    passkey : Number
});
const User = mongoose.model("User", userlogin);


//DATABASE SETUP END






//API CREATIONS

app.post("/createuser",async(req,res)=>{

    const{username, name, passkey} = req.body;

    const createuser = await User.create({
        username,name,passkey
    })
    res.json(createuser);
});

app.get("/alluser", async (req, res) => {
    try {
        const displayAll = await User.find();
        res.json(displayAll);
    } catch (error) {
        console.error("Error fetching all users:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.get("/deleteone",async(req,res)=>{
    const deleteone = await User.deleteOne({name:"Nikhilesh Rana"});
    res.json(deleteone);
});

app.get("/deleteall",async(req,res)=>{
    const deleteall = await User.deleteMany({});
    res.json(deleteall);
});


//API CREATION ENDS HERE



//LISTENING PORT HERE
app.listen(port);