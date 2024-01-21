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
        const email=req.body.email;
        const password=req.body.password;
        Persondata.findOne({email})
            .then(logindata=>{
                    if(logindata){
                        bcrypt.compare(password,logindata.password)
                            .then(password=>{
                                if(password){
                                    const usertype=logindata.usertype;
                                    if(usertype=="admin"){
                                        return res.json({logindata})
                                    }
                                    else{
                                        return res.json({usertype:"student"})
                                    }
                                }
                                else{
                                    return res.json({password:"passsword is incorrect"})
                                }
                            })
                            .catch(err=>console.log("Error in password"))
                        
                    }
                    else{
                        return res.json({userlogin:"username and pssword is not coreect"})
                    }
            })
            .catch(err=>console.log("error in login page"))
})
module.exports=router