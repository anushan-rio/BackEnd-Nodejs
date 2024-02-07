const express=require('express');
const mongoose=require('mongoose');
const passport=require('passport');
const router=express.Router();

const Person=require('../../models/Person');
const Books=require('../../models/Books');
const { findByIdAndDelete } = require('../../models/Person');

router.post('/addbooks',
        passport.authenticate("jwt", { session: false }), 
        (req,res)=>{
            const Booksvalues = {};
            Booksvalues.OrgId = req.user.id;
            if (req.body.BookTitle) Booksvalues.BookTitle = req.body.BookTitle;
            if (req.body.Author) Booksvalues.Author = req.body.Author;
            if (req.body.Category) Booksvalues.Category = req.body.Category;
            if (req.body.Subject) Booksvalues.Subject = req.body.Subject;
            if (req.body.Publisher) Booksvalues.Publisher = req.body.Publisher;
            if (req.body.Price) Booksvalues.Price = req.body.Price;
            if (req.body.Status) Booksvalues.Status = req.body.Status;
            if (req.body.Quatity) Booksvalues.Quatity = req.body.Quatity;
            if (req.body.RackNo) Booksvalues.RackNo = req.body.RackNo;
            Books.findOne({BookTitle:req.body.BookTitle})
                .then(books=>{
                    if(books){
                        //return res.json({"books":"already exist"})
                        Books.findOneAndUpdate(
                            { BookTitle: req.body.BookTitle,OrgId:req.user.id},
                            { $set: Booksvalues },
                            { new: true }
                          )
                            .then(books => res.json(books))
                            .catch(err => console.log("problem in update" + err));
                    }
                    else{
                        new Books(Booksvalues)
                            .save()
                            .then(books => res.json(books))
                            .catch(err => console.log(err));
                    }
                })
                .catch(err=>console.log("error in add---"+err))

        })


router.delete('/deletebooks',
            passport.authenticate("jwt", { session: false }),
                (req,res)=>{

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