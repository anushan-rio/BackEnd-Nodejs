const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const BooksSchema=new Schema({
    OrgId:{
        type: Schema.Types.ObjectId,
        ref: "Persondata"
    },
    BookTitle:{
        type:String,
        require:true
    },
    Author:{
        type:String,
        require:true
    },
    Category:{
        type:String
    },
    Subject:{
        type:String,
        require:true
    },
    Publisher:{
        type:String,
        require:true
    },
    Price:{
        type:Number,
        require:true
    },
    Status:{
        type:String,
        require:true
    },
    Quatity:{
        type:Number,
        require:true
    },
    RackNo:{
        type:String,
        require:true
    },
    date:{
        type: Date,
        default: Date.now
    },
    
    
})

module.exports=Books=mongoose.model('Book',BooksSchema)