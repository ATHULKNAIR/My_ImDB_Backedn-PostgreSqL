const db = require('../models');
const Movies = db.movies;
const Op =db.Sequelize.Op;
const Actor = db.actor;
const Comment = db.comment;

// Create and Save a new Movies

exports.create = (req,res)=>{
    
    if(!req.body.title){
        res.status(400).send({message : "Content cannot be empty.!"});
        return;
    }
    
    const movies = {
        title : req.body.title,
        released_date : req.body.released_date,
        plot : req.body.plot,
        genre : req.body.genre,
        rated : req.body.rated,
        awards : req.body.awards
        
    };
  
    Movies.create(movies)
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({message: err.message || "Error Occurred"});
    });
};

// Retrieve all Moviess from the database

exports.findAll =(req,res)=>{
    const title = req.query.title;
    var condition = title ? {title : {[Op.iLike]: `%${title}%`}} : null;

    Movies.findAll({
        where:condition,include:["comment","actors"]
        // include : [
        //     {
        //         model : Actor,
        //         as : "actors",
        //         through : {
        //             attributes: ["id","title","genre"]
        //         }
        //     },
        //     {
        //         model : Comment,
        //         as : "comment",
        //         through : {
        //             attributes : ["id","name","text"]
        //         }
        //     }
        // ]
    
    })
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({message:err.message || "Error occurred"});
    });
};

// Find a single Movies with an id

exports.findOne =(req,res)=>{
    const id = req.params.id;
    Movies.findByPk(id,{include:["comment","actors"]})
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({message : err.message ||"Error retrieving Movies"+id});
    });
};

// Update a Movies with an id

exports.update = (req,res)=>{
    const id = req.params.id;
    Movies.update(req.body,{
        where : {id: id}
    })
    .then(num=>{
        if(num==1){
            res.send({message : "Movies Updated Successfully"});
        }else{
            res.send({message: "Cannot update Movies"});
        }
    })
    .catch(err=>{
        res.status(500).send({message : "Error Updating Movies"});
    })
};

// Delete a Movies with specified id

exports.delete= (req,res)=>{
    const id = req.params.id;
    Movies.destroy({
        where : {id:id}
    })
    .then(num=>{
        if(num == 1){
            res.send({message: "Movies was deleted Successfully"});
        }else{
            res.send({message: "Cannot delete Movies"});
        }
    })
    .catch(err=>{
        res.status(500).send({message:"couldnot delete Movies.."});
    })

};

// Delete all Moviess from database

exports.deleteAll = (req,res)=>{
    Movies.destroy({
        where:{},
        truncate : false
    })
    .then(nums=>{
        res.send({message:`${nums} Moviess were deleted Successfully`});
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"Eroor occurred while deleting all movies"});
    })
};


