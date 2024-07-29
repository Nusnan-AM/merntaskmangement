const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

const app = express();

app.get("/",(req,res) => {
    res.send("Hello ");
});

//middleware
app.use((req,res,next) =>{
    console.log('path' + req.path +'method' + req.method);
    next();
});


mongoose.connect(process.env.MONGO_URI).then(()=>{
        app.listen(process.env.PORT,() =>{
            console.log("DB Connected  " + process.env.PORT);
    });
 }).catch((error)=>console.log(error));


