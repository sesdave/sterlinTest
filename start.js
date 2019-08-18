const app = require('./app.js');
require("dotenv").config();
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

app.listen(port, ()=>console.log(`Listening on port ${port}`));
