const express=require('express');
const mongoose=require('mongoose');
const passport=require('passport');
const router=express.Router();

const Person=require('../../models/Person');
const Addperson=require('../../models/AddPerson');






router.get('/',(req,res)=>{
    res.send("welcome to add person")
})


router.post('/addperson',
            passport.authenticate("jwt", { session: false }),
            (req,res)=>{
                Addperson.findOne({RollNo:req.body.RollNo})
                    .then(addperson=>{
                        if(addperson){
                            return res.json({"RollNo":"RollNoalready exist"})
                        }
                        else{
                            const newaddperson=new Addperson({
                                StudentName:req.body.StudentName,
                                Address:req.body.Address,
                                RollNo:req.body.RollNo,
                                Phno:req.body.Phno,
                                Usertype:req.body.Usertype,
                                OrgId:req.user.id,
                                Password:req.body.Password
                            })
                            newaddperson.save()
                                .then(addperson=>res.json({addperson}))
                                .catch(err=>console.log("Err in addperson save"))
                        }
                    })
                    .catch(err=>console.log("Error in Addperson"))
            })


module.exports=router