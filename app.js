const express=require('express');
const mongoose=require('mongoose');
const bodyParser = require('body-parser')
const passport = require("passport");
const app=express();
const port= process.env.PORT || 4000;


const db=require('./setup/myurl').mongoURL
mongoose.connect(db)
    .then(()=>console.log("DB IS CONNECTED"))
    .catch(err=>console.log(" ERROR IN DB"))


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize());
require("./strategies/JsonWebToke")(passport);


const auth=require('./routes/api/auth')
const joinperson=require('./routes/api/joinpersons');



app.use('/api/auth',auth);
app.use('/api/joinpersons',joinperson)

app.listen(port,()=>console.log('localhost:'+port))