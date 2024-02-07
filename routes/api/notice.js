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
            if(req.body.Schedulemonth) noticevalues.Schedulemonth=req.body.Schedulemonth;
            new Notice(noticevalues)
                .save()
                .then(notice=>res.json(notice))
                .catch(err=>console.log("error in noticeboard"+err))
            })
module.exports=router;

