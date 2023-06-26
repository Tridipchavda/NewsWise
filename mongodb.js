const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/newswise").then(()=>{
    console.log("Connect TO DB");
}).catch((error)=>{
    console.log("error");
})  

const loginSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    }
})

const collection = new mongoose.model("user",loginSchema)

module.exports = collection;