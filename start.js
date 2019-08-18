const app = require('./app.js');
require("dotenv").config();
//const port=process.env.PORT||3000;
//const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

//app.listen(port, ()=>console.log(`Listening on port ${port}`));
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});