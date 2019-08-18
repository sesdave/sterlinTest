require("dotenv").config();
var Team=require("../models/team");
var mongoose=require("mongoose");

//mongoose.connect('localhost:27017/sterlin');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/heroku_stksppzn',{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>console.log("Database Seeded"));


var team=[
    new Team({
       name:"team Q",
    }),
    new Team({
        name:"team R",
    }),
    new Team({
        name:"team S",
    }),
    new Team({
        name:"team T",
    }),
    new Team({
        name:"team U",
    }),
    new Team({
        name:"team A",
     }),
     new Team({
         name:"team B",
     }),
     new Team({
         name:"team C",
     }),
     new Team({
         name:"team D",
     }),
     new Team({
         name:"team E",
     }),
     new Team({
        name:"team F",
     }),
     new Team({
         name:"team G",
     }),
     new Team({
         name:"team H",
     }),
     new Team({
         name:"team I",
     }),
     new Team({
         name:"team J",
     }),

];

var done=0;
for (var i=0;i<team.length; i++){
    team[i].save(function(err, result){
        done++;
        if(done===team.length){
            exit();
        }
    });
} 


function exit(){
    mongoose.disconnect();
}