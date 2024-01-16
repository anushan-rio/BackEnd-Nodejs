const mongoose=require('mongoose');
const schema=mongoose.Schema;


const PersonSchema=new schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    libraryname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    usertype:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports=Person=mongoose.model('Persondata',PersonSchema)