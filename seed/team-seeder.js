require("dotenv").config();
var Team=require("../models/team");
var mongoose=require("mongoose");

//mongoose.connect('localhost:27017/sterlin');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/sterlin',{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>console.log("Database Connected"));


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