// This file is to connect the front end with the mongodb database & fetch request and responses

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// for uploading files
// import multer from "multer";
// import GridFsStorage from "multer-gridfs-storage";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect("mongodb+srv://somesh:somesh@cluster0.k9tc1.mongodb.net/User?retryWrites=true&w=majority", {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Database connected");
}).catch((err)=> console.log(err));

// Schema to store user details in database
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, 
    fileList: Object
});

const User = new mongoose.model("User", userSchema);

// route to configure signin request
app.post("/signin", (req, res)=> {
    const { email, password} = req.body;
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user});
            } else {
                res.send({ message: "Password didn't match"});
            }
        } else {
            res.send({message: "User not registered"});
        }
    })
});

// route to configure signup request
app.post("/signup", (req, res)=> {
    const { name, email, password} = req.body;
    const fileList = [];
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"});
        } else {
            const user = new User({
                name,
                email,
                password,
                fileList
            });
            user.save(err => {
                if(err) {
                    res.send(err);
                } else {
                    res.send( { message: "Successfully Registered, Please login now." });
                }
            });
        }
    });
});

// route to configure fileupload request
app.post("/fileupload", (req, res)=> {
    const {userId, currentFile} = req.body;
    User.findOneAndUpdate({_id: userId}, {$push : {fileList: currentFile}}, { returnNewDocument: true })
    .then(updatedDocument => {
        if(updatedDocument) {
          console.log(`Successfully updated document: ${updatedDocument}.`)
        } else {
          console.log("No document matches the provided query.")
        }
      })
      .catch(err => console.error(`Failed to find and update document: ${err}`));
});

app.listen(8000,() => {
    console.log("Backend running on 8000 port");
});