const express=require("express");
router=express.Router();

const {
    signin,
    signout,
    signup,
    isAuth,
    isAdmin,
}=require("../controllers/auth");
//const { userSignupValidator}=require("../validator");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);

module.exports=router;