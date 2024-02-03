const express=require('express');
const mongoose=require('mongoose');
const passport=require('passport');
const router=express.Router();

const Person=require('../../models/Person');
const Books=require('../../models/Books');

router.post('/addbooks',
            passport.authenticate("jwt", { session: false }),
            (req,res)=>{
                Books.findOne({BookTitle:req.body.BookTitle})
                    .then(books=>{
                        if(books){
                            return res.json({"books":"already exist"})
                        }
                        else{
                          
                            const newbooks=new Books({
                                BookTitle:req.body.BookTitle,
                                Author:req.body.Author,
                                Category:req.body.Category,
                                Subject:req.body.Subject,
                                Publisher:req.body.Publisher,
                                Price:req.body.Price,
                                Status:req.body.Status,
                                Quatity:req.body.Quatity,
                                RackNo:req.body.RackNo,
                                OrgId:req.user.id
                            })
                            newbooks.save()
                                .then(books=>{
                                    return res.json({books})
                                })
                                .catch(err=>console.log("err in savebooks"))
                        }
                    })
                    .catch(err=>console.log("Addbooks error"))
            })



router.post('/updatebooks', 
            passport.authenticate("jwt", { session: false }),
            (req,res)=>{
                const BookTitle=req.body.BookTitle;
                Books.findOne({BookTitle})
                    .then(books=>{
                        return res.json({books})
                    })
                    .catch(err=>console.log("Err problem"))
            })





router.get('/searchbooks',
    passport.authenticate("jwt", { session: false }),
    (req,res)=>{
        const BookTitle=req.body.BookTitle;
        const  OrgId=req.user.id
        Books.findOne({BookTitle,OrgId})
            .then(books=>{
               
                if(books){
                    const booksid=books.id;
                    const RackNo=books.RackNo;
                    const Status=books.Status
                    const Author=books.Author;
                    const Quatity=books.Quatity;
                     return res.json({booksid,RackNo,Status,Author,Quatity})
                }
                else{
                    return res.json({"books":"books does not exist"})
                }
            })
            .catch(err=>console.log("err in search"))
})



module.exports=router