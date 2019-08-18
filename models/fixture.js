const mongoose=require("mongoose");
//const uuid = require('uuid/v4')

 /* var uidentify=uuid();
 const urldefault="localhost/"+uidentify; */
const FixtureSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    status:{
        type:Number,
        default:0
    },
    url:{
        type:String,
        default:"urldefault"
    },
    urlid:String,

}, {timestamps:true});

module.exports=mongoose.model("Fixture", FixtureSchema)
