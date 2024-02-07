const mongoose=require('mongoose');
const Schema=mongoose.Schema


const NoticeSchema=new Schema({
    OrgId:{
        type: Schema.Types.ObjectId,
        ref: "Persondata"
    },
    Desc:{
        type:String,
        require:true
    },
    venue:{
        type:String,
        require:true
    },
    Schedulemonth:{
        type:String,
        require:true
    },
    Date:{
        type: Date,
        default: Date.now
    }
})

module.exports=Noticeboard=mongoose.model('notice',NoticeSchema);


