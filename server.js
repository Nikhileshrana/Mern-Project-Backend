const express = require("express");
const port = 3000;
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser())
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"nikhileshranaastroverseisgreatbitch"
}));



// DATABASE SETUP

const mongoose =  require("mongoose");
const url = "mongodb+srv://nikhileshrana:Brave222@cluster0.kezpsvp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url);

const usersignup = mongoose.Schema({
    username : String , 
    name : String , 
    mail : String,
    passkey : Number
});

const User = mongoose.model("User", usersignup);





//API CREATIONS

app.post("/createuser",async(req,res)=>{

    try
    {
    const{username, name, mail, passkey} = req.body;
    
    if(username=="" || name=="" || mail=="" || passkey=="")
    {
        res.send("Fill Out all the Details First. :)");
    }
    else
    {
    const createuser = await User.create({
        username,name,passkey,mail
    })
    if(createuser){
    res.redirect("https://mern-project-frontend-chi.vercel.app/");
    }
    }
    
    }
    catch(e)
    {
        console.log("Error Occured Data Not Saved!" , e);
    }
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
    const deleteone = await User.deleteOne({username:"nikhilrana"});
    res.json(deleteone);
});

app.get("/deleteall",async(req,res)=>{
    const deleteall = await User.deleteMany({});
    res.json(deleteall);
});


app.post("/login", async (req, res) => {
    const { my_username, my_passkey } = req.body;
    console.log(my_username,my_passkey);
    try {
        const finduser = await User.findOne({ username: my_username , passkey: my_passkey });
        console.log("User found:", finduser.username , finduser.passkey);

        if (finduser && finduser.username==my_username && finduser.passkey == my_passkey) {
            res.cookie("username",finduser.username);
            res.cookie("passkey",finduser.passkey);
            res.cookie("name",finduser.name);
            res.cookie("mail",finduser.mail);

            res.redirect("https://mern-project-frontend-chi.vercel.app/");
        } 

    } catch (err) {
        console.error(err);
        res.redirect("https://mern-project-frontend-chi.vercel.app/Login");
    }
});


app.listen(port);