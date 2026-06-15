import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/examenCloudinary")

const connection = mongoose.connection;

connection.once("open", ()=>{
    console.log("db is connected")
});

connection.on("disconnected", ()=>{
    console.log("db is disconnected")
})

connection.on("error", ()=>{
    console.log("error found: " + error)
})