const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const AddPersonSchema= new Schema({
    Quatity:{
        type:Number,
        require:true
    },
    Booktitle:{
        type:String,
        require:true
    },
    Author:{
        type:String,
        require:true
    },
    Subject:{
        type:String,
        require:true
    },
    Publisher:{
        type:String
    },
    Price:{
        type:Number,
        require:true
    },
    Rackno:{
        type:Number,
        require:true
    }
    
})