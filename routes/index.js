const express=require("express");
const router=express.Router();
const auth=require("./auth");
//const user=require("./user");
const team=require("./team");
const fixture=require("./fixture");

router.use('/',auth);
//router.use('/',user);
router.use('/',team);
router.use('/',fixture);

module.exports=router;
