require("dotenv").config();
var User=require("../models/user");
var mongoose=require("mongo-unit");

mongoose.connect(process.env.DATABASE);

var user=[
    new User({
        username:"david",
        password:"friend",
        role:1
    }),
    new User({
        username:"friday",
        password:"friend",
        role:1
    }),
    new User({
        username:"monday",
        password:"friend",
        role:0
    }),

];

var done=0;

for (i=0, i<user.length, i++){
    user[i].save(function(err, result){
        done++;
        if(done===user.length){
            exit();
        }
    })
}

function exit(){
    mongoose.disconnect();
}