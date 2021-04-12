
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

exports. findAll = (req,res)=>{
    Actor.findAll({
         include :["movies"]
        // include :[
        //     { 
        //         as : "movies",
        //         through : {
        //             attirbutes : ["id","title"]
        //         }
        //     }
        // ]
    })
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({message :"Error..!"})
    })
}

exports.findActorById = (req,res)=>{
    const id = req.params.id;
    Actor.findByPk(id,{include :["movies"]})
    .then((data)=>{
        if(data){
            res.send(data);
            return;
        }else{
            res.send({message : "No actor with this id"})
        }
       
        
    })
    .catch(err=>{
        res.status(500).send({message : "Error Occured..!"});
    })
}

// Add a Movie to a Actor

// exports.addMovie = (req,res)=>{
//     const actorId = req.params.actorId;
//     const id = req.params.id;
//     Actor.findByPk(actorId)
//     .then(actor=>{
//         if(!actor){
//             res.send({message:"No actor Found"});
//             return;
//         }
//         Movies.findByPk(id).then((movies)=>{
//             if(!movies){
//                 res.send({message: "No movie found"})
//                 return;
//             }
//             actor.addMovie(movies);
//             res.send({message:"Movie added to Actor"});
//             return actor;
//         })
//      res.send(actor);

//     })
//     .catch(err=>{
//         res.status(500).send({message :"Error Occurred"});
//     })
// }


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