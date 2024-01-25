const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const passport=require('passport');
const jsonwt = require("jsonwebtoken");

const key=require('../../setup/myurl');
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
                                        //return res.json({logindata})
                                        console.log("TT")
                                        const payload = {
                                            id: logindata.id,
                                            username:logindata.username,
                                            email: logindata.email
                                          };
                                          jsonwt.sign(
                                            payload,
                                            key.secret,
                                            { expiresIn: 3600 },
                                            (err, token) => {
                                              res.json({
                                                success: true,
                                                token: "Bearer " + token
                                              });
                                            }
                                          );
                                          console.log(payload)
                                    }
                                    else{
                                        console.log("T4")
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


router.get(
    "/session",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      // console.log(req);
      res.json({
        id: req.user.id,
        
        email: req.user.email
       
      });
    }
  );


module.exports=router