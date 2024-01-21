const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const Persondata=require('../../models/Person');


router.post('/register',(req,res)=>{
    Persondata.findOne({email:req.body.email})
        .then(persondata=>{
            if(persondata){
                return res.json({"email":"emailid already exist"})
            }
            else{
                const newPersondata=new Persondata({
                   email:req.body.email,
                   username:req.body.username,
                   libraryname:req.body.libraryname,
                   password:req.body.password,
                   country:req.body.country,
                   usertype:req.body.usertype
                })  
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newPersondata.password, salt, (err, hash)=>{
                        if (err) throw err;
                        newPersondata.password = hash;
                        newPersondata
                        .save()
                         .then(person => res.json(person))
                         .catch(err => console.log(err));
                    });
                });
                       
                        }
            
        })
        .catch(err=>console.log("ERROR IN REGISTERATION PLEASE CONATCT ADMIN"))
})

router.post('/login',(req,res)=>{
    
})
module.exports=router