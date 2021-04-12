
const db = require('../models');
const Actor = db.actor;
const Movies = db.movies;

exports.create = (req,res)=>{

    Actor.create({
        name : req.body.name
    })
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({message : "Actor not included"});
    })
}

exports.delete = (req,res)=>{
   
    const id = req.params.id;
    Actor.destroy({
        where :{id:id}
    })
    .then(data=>{
        res.send({message : "Actor deleted"})
    })
    .catch(Err=>{
        res.status(500).send({message:"Not deleted..."})
    })
}

exports.findAll = (req,res)=>{
    Actor.findAll({
        include :[{
            model : Movies,
            as : "movies",
            attirbutes : ["id","title","genre"],
            through : {
                attributes : []
            }
        }]
    })
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({message :"Error occurred..!"})
    });
}

exports.findActorById = (req,res)=>{
    const id = req.params.id;
    Actor.findByPk(id,{
        include :[{
            model : Movies,
            as : "movies",
            attirbutes : ["id","title","genre"],
            through : {
                attirbutes :[]
            }
        }]
    })
    .then((data)=>{
            res.send(data);
    })
    .catch(err=>{
        res.status(500).send({message : "Error Occured..!"});
    })
}




exports.addMovie = (actorId,movieId)=>{
    return Actor.findByPk(actorId)
    .then((actor)=>{
        if(!actor){
            console.log("Actor Not Found")
            return null;
        }
        return Movies.findByPk(movieId)
        .then(movies=>{
            if(!movies){
                console.log("Movie not found")
                return null;
            }

            actor.addMovie(movies);
            console.log(`added MovieId =${movies.id} to ActorId = ${actor.id}`);
            return actor;
        });
    })
    .catch(err=>{
        console.log("Error while adding Movie to Actor",err);
    })
}