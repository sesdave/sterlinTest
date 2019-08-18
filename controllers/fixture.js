const Fixture=require("../models/fixture");
const validator = require('validator')

uuidv=require("uuid");

exports.fixtureById=(req, res, next, id)=>{
    Fixture.findById(id).exec((err, data)=>{
        if(err||!data){
            res.status(400).json({
                err:"Fixture not Found"
            });
        }
        req.fixture=data;
        next();
    });
    

};

exports.fixtureByUrlId=(req, res, next, urlid)=>{
    Fixture.find({urlid:urlid}).exec((err, data)=>{
        if(err||!data){
            res.status(400).json({
                err:"Fixture may have been deleted"
            });
        }
        req.fixtureurl=data;
        next();
    });
    

};

exports.CreateFixture=(req, res)=>{
    let radomId=uuidv.v4()
    const url="http://127.0.0.1:4000/api/generate_feature/"+radomId;
    console.log("req.body", req.body);
    const fixture=new Fixture(req.body)
    fixture.url=url;
    fixture.urlid=radomId;
    fixture.save((err, data)=>{
        if(err){
            res.status(400).json({
                err:"Could not Create Fixture"
            });
        }
        //data.status==0?"Pending":"completed";
        res.json({
            data
        });
    });

};
exports.readFixture=(req, res)=>{
    const fixture=req.fixture;

    res.json({
        fixture
    });
};
exports.updateFixture=(req, res)=>{
    const fixture=req.fixture;
    fixture.name=req.body.name;
    fixture.status=req.body.status;
    fixture.save((err, data)=>{
        if(err){
            res.status(400).json({
                err:"Unable to update Fixture"
            });
        }
        res.json({
            data
        });
    });
};
exports.DeleteFixture=(req, res)=>{
    const fixture=req.fixture;
    fixture.remove((err, data)=>{
        if(err){
            res.status(400).json({
                err:"Unable to update Fixture"
            });
        }
        res.json({
            message:"Fixture Successfully Deleted"
        });
    });

};
exports.PendingFixture=(req, res)=>{
    Fixture.find({status:0}).exec((err, fixture)=>{
        if(err||!fixture){
            res.status(400).json({
                err:"Cannot find any Pending Fixture"
            });
        }
        res.json({
            fixture
        })

    });
};
exports.CompletedFixture=(req, res)=>{
    Fixture.find({status:1}).exec((err, fixture)=>{
        if(err||!fixture){
            res.status(400).json({
                err:"Cannot find any Completed Fixture"
            });
        }
        res.json({
            fixture
        })

    });

};
exports.GeneratedFixture=(req, res)=>{
    const fixtureurl=req.fixtureurl;
    fixtureurl.urlid=undefined;
    res.json({
        fixtureurl
    });
};

exports.ListFixtures=(req, res)=>{
    Fixture.find().exec((err, fixture)=>{
        if(err||!fixture){
            res.status(400).json({
                err:"Cannot find any Fixture"
            });
        }
        res.json({
            fixture
        })

    });

};
exports.searchFixtures=(req, res)=>{
    const pageSize = 20
    const escpQuery = Object.assign({}, ...Object.keys(req.query).map(obKey => {
        return {[obKey]: validator.escape(req.query[obKey])}
    }))
    const currentPage = parseInt(escpQuery.page) > 0 ? parseInt(escpQuery.page) - 1 : 0
    const filter = escpQuery.filter || ''
    const sortBy = escpQuery.sortBy || 'name'
    const orderBy = escpQuery.orderBy || 'asc'
    const sortQuery = {
        [sortBy]: orderBy
    }
    const filterQuery = {
        name: new RegExp(filter, 'i')
    }

    Fixture.countDocuments(filterQuery)
    .then(fixtureCount => {
        if (currentPage * pageSize > fixtureCount) {
        return res.status(400).json([])
        }
        Fixture.find(filterQuery)
        .limit(pageSize)
        .skip(currentPage * pageSize)
        .sort(sortQuery)
        .then(fixtures => {
        return res.status(200).json({
            fixtures,
            page: escpQuery.page || 1,
            total: fixtureCount,
            pageSize: pageSize
        })
        })
    })
    .catch(err => {
        console.log('Error finding fixtures:', err)
        return res.status(500).json({msg: 'no fixture found'})
    })
};
