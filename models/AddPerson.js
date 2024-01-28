const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const  AddPersonSchema=new Schema({
    StudentName:{
        type:String,
        require:true
    },
    RollNo:{
        type:Number,
        require:true
    },
    Password:{
        type:String,
        require:true
    },
    Address:{
        type:String,
        require:true
    },
    Phno:{
        type:Number,
        require:true
    },
    Usertype:{
        type:String,
        require:true
    },
    OrgId:{
        type: Schema.Types.ObjectId,
        ref: "Persondata"
    },
    date:{
        type: Date,
        default: Date.now
    }

})

module.exports=AddPerson=mongoose.model('AddPerson',AddPersonSchema)