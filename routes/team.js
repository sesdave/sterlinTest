const express=require("express");
const router=express.Router();
const { userById }=require("../controllers/user")
const  {
        isAuth,
        isAdmin
        }=require("../controllers/auth")

const {
         CreateTeam, 
         FindTeam,
         UpdateTeam,
         DeleteTeam, 
         ListTeams, 
         teamById, 
         searchTeams 
        }= require("../controllers/team");


router.get("/team/:teamId",isAuth, FindTeam);
router.post("/create_team/:userId",isAuth,isAdmin, CreateTeam);
router.put("/update_team/:teamId/:userId", isAuth,isAdmin, UpdateTeam);
router.delete("/delete_team/:teamId/:userId",isAuth,isAdmin, DeleteTeam);
router.get("/all_teams",isAuth, ListTeams);
router.get("/search_teams", searchTeams);

router.param("teamId", teamById);
router.param("userId", userById);


module.exports=router;