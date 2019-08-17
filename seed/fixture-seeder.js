require("dotenv").config();
var Fixture=require("../models/fixture");
var mongoose=require("mongoose");
var uuid=require("uuid")

//mongoose.connect('localhost:27017/sterlin');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/sterlin',{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>console.log("Data Seeded"));

var unidef=uuid.v4();
var otheruui="http://localhost/"+unidef;
var fixture=[
    new Fixture({
        name:"FixtureZ",
        status:1,
        url:otheruui
    }),
    new Fixture({
        name:"FixtureY",
        status:0,
    }),
    new Fixture({
        name:"FixtureX",
        status:1,
    }),

];

var done=0;
for (var i=0;i<fixture.length; i++){
    fixture[i].url="http://localhost/"+uuid.v4();
    fixture[i].save(function(err, result){
        done++;
        if(done===fixture.length){
            exit();
        }
    });
} 


function exit(){
    mongoose.disconnect();
}