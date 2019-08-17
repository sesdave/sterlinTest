const moogoose=require("mongoose");

const TeamSchema=new moogoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:32,
        unique:true
    }
},{timestamps:true});

module.exports=moogoose.model("Team", TeamSchema);