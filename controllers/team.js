const Team=require("../models/team");
const validator = require('validator')

exports.teamById=(req, res, next, id)=>{
    Team.findById(id).exec((err,team)=>{
        if(err||!team){
            return res.status(400).json({
                error:"Team not found"
            });
        }
        req.team=team;
        next();
    });
};

exports.CreateTeam=(req, res)=>{
    console.log("req.body", req.body);
    const team=new Team(req.body);

    team.save((err, data)=>{
        if(err){
            return res.status(400).json({
                err:"Unable to add Team"
            });
        }
        res.json({
            data
        });
    });

};
exports.UpdateTeam=(req, res)=>{
    const team=req.team;
    team.name=req.body.name;
    team.save((err, data)=>{
        if(err){
            res.status(400).json({
                err:"Could not update Team"
            });
        }
        res.json({
            data
        })
    });

};
exports.FindTeam=(req, res)=>{
    const team=req.team;
    res.json({
        team
    });
};
exports.DeleteTeam=(req, res)=>{
    const team=req.team;
    team.remove((err, data)=>{
        if(err){
            res.status(400).json({
                err:"Could not delete Team"
            });
        }
        res.json({
            message:"Team Deleted Successfully"
        })
    });

};
exports.ListTeams=(req, res)=>{
    Team.find().exec((err, team)=>{
        if(err||!team){
            res.status(400).json({
                err:"Teams could not be found"
            });
        }
        res.json({
            team
        });
    });
};
exports.searchTeams=(req, res)=>{
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

    Team.countDocuments(filterQuery)
    .then(teamCount => {
        if (currentPage * pageSize > teamCount) {
        return res.status(400).json([])
        }
        Team.find(filterQuery)
        .limit(pageSize)
        .skip(currentPage * pageSize)
        .sort(sortQuery)
        .then(teams => {
        return res.status(200).json({
            teams,
            page: escpQuery.page || 1,
            total: teamCount,
            pageSize: pageSize
        })
        })
    })
    .catch(err => {
        console.log('Error finding teams:', err)
        return res.status(500).json({msg: 'no team found'})
    })
};