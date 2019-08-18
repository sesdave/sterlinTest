require("dotenv").config();
var Fixture=require("../models/fixture");
var mongoose=require("mongoose");
var uuid=require("uuid")

//mongoose.connect('localhost:27017/sterlin');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/heroku_stksppzn',{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>console.log("Data Seeded"));


var fixture=[
    new Fixture({
        name:"FixtureZ",
        status:1,
    }),
    new Fixture({
        name:"FixtureY",
        status:0,
    }),
    new Fixture({
        name:"FixtureX",
        status:1,
    }),
    new Fixture({
        name:"FixtureA",
        status:1,
    }),
    new Fixture({
        name:"FixtureB",
        status:0,
    }),
    new Fixture({
        name:"FixtureC",
        status:1,
    }),
    new Fixture({
        name:"FixtureD",
        status:1,
    }),
    new Fixture({
        name:"FixtureE",
        status:0,
    }),
    new Fixture({
        name:"FixtureF",
        status:1,
    }),
    new Fixture({
        name:"FixtureG",
        status:1,
        url:otheruui
    }),
    new Fixture({
        name:"FixtureH",
        status:0,
    }),
    new Fixture({
        name:"FixtureI",
        status:1,
    }),

];

var done=0;
for (var i=0;i<fixture.length; i++){
    fixture[i].url="http://127.0.0.1:4000/api/generate_feature/"+uuid.v4();
    fixture[i].urlid= uuid.v4();
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