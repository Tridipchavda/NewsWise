const express = require('express')
const collection = require('./mongodb')
const bp = require("body-parser")
const app = express()
const cors = require('cors');

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({extended:true}))

app.post("/signin",async(req,res)=>{
    const data = {
        username:req.body.username,
        password:req.body.password,
        name:req.body.name,
        email:req.body.email,
    }
    console.log(data);
    try{
        collection.insertMany([data]).then((m)=>{
            console.log(m);
            res.send("success");
        }).catch((e)=>{
            console.log(e.message);
            res.send("error");
        })
        
    }catch(error){
        console.log("Error");
        res.send("error");
    }
})

app.post("/login",async(req,res)=>{
    const data = {
        username:req.body.username,
        password:req.body.password,
    }

    collection.findOne(data).then((data)=>{
        
        if(data == null){
            res.send("error");
            console.log("error");
        }else{
            res.send("success");
            console.log("success");
        }
        
    }).catch((e)=>{
        console.log(e);
        res.send("error");
    })
})

app.listen(3333,()=>{
    console.log("Server started on 3333 Port");
})