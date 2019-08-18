express=require("express");
const { userById }=require("../controllers/user")

router=express.Router();
const  {
     isAuth,
     isAdmin
     }=require("../controllers/auth")

const { 
        CreateFixture, 
        readFixture, 
        updateFixture, 
        DeleteFixture, 
        PendingFixture, 
        CompletedFixture,
        GeneratedFixture, 
        ListFixtures,
        searchFixtures,
        fixtureByUrlId,
        fixtureById
     }=require("../controllers/fixture")

router.post("/create_fixtures/:userId",isAuth,isAdmin, CreateFixture);
router.get("/fixtures/:fixtureId",isAuth, readFixture);
router.put("/fixtures/:fixtureId/:userId",isAuth,isAdmin, updateFixture);
router.delete("/fixtures/:fixtureId/:userId",isAuth,isAdmin, DeleteFixture);
router.get("/pending_fixtures", isAuth, PendingFixture);
router.get("/completed_fixtures",isAuth, CompletedFixture);
router.get("/generate_feature/:userUrlId", GeneratedFixture);
router.get("/all_fixtures", isAuth , ListFixtures);
router.get("/search_fixtures", searchFixtures);

router.param("fixtureId", fixtureById);
router.param("userUrlId", fixtureByUrlId);
router.param("userId", userById);

module.exports=router;