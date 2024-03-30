const express=require('express');
const mongoose=require('mongoose');
const passport=require('passport');

const router=express.Router();

const Person=require('../../models/Person');
const Notice=require('../../models/Noticeboard')

router.post('/notice',
            passport.authenticate("jwt", { session: false }),
            (req,res)=>{
            const noticevalues={};
            noticevalues.OrgId=req.user.id;
            if(req.body.Desc) noticevalues.Desc=req.body.Desc;
            if(req.body.venue) noticevalues.venue=req.body.venue;
            if(req.body.StartDate) noticevalues.StartDate=req.body.StartDate;
            if(req.body.Enddate) noticevalues.Enddate=req.body.Enddate;
            new Notice(noticevalues)
                .save()
                .then(notice=>res.json(notice))
                .catch(err=>console.log("error in noticeboard"+err))
            });

router.delete('/noticedelete',
            passport.authenticate("jwt", { session: false }),
            (req,res)=>{
                Notice.findOne({venue:req.body.venue})
                    .then(notice=>{
                       if(notice){
                       console.log(notice)
                        Notice.findOneAndDelete({venue:req.body.venue})
                        console.log("-----1------"+notice)
                        return res.json({"type":"sucessfullly delete"})
                       }
                       else{
                        return res.json({"type":"deletion is unsuccessfull"})
                        
                       }
                        
                    })
                    .catch(err=>console.log("err-----"+err))
                    
            })

module.exports=router;

