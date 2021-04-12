const db = require('../models');
const Movies = db.movies;
const Director = db.director;

// create new director

exports.create = (req,res)=>{
    Director.create({
        name : req.body.name
    })
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({message : "Director not included"})
    });
};

// Retrieve all directors 

exports.findAll = (req,res)=>{
    Director.findAll({
        // include : ["movies"]
        include :[{
            model : Movies,
            as :"movies",
            attributes : ["id","title"],
            through : {
                attributes : []
            }
        }]
    })
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({message: "Error occurred..!"})
    });
};

// Retrieve Director by id

exports.findDirectorById = (req,res)=>{
    const id = req.params.id;
    Director.findByPk(id,{
        include:[{
            model:Movies,
            as :"movies",
            attributes : ["id","title","genre"],
            through :{
                attributes :[]
            }
        }]
    })
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({message : "Error Occurred..!"});
    });
};

// Delete Director by id

exports.delete = (req,res)=>{
   
    const id = req.params.id;
    Director.destroy({
        where :{id:id}
    })
    .then(data=>{
        res.send({message : "Actor deleted"})
    })
    .catch(Err=>{
        res.status(500).send({message:"Not deleted..."})
    })
}

// add relation to Movies

exports.addMovies = (directorId,moviesId)=>{
  return Director.findByPk(directorId)
    .then(director=>{
        if(!director){
            console.log("Director not found");
            return null;
        }
        return Movies.findByPk(moviesId)
        .then(movies=>{
            if(!movies){
                console.log("Movies Not found");
                return null;
            }
            director.addMovies(movies);
            console.log("added Movies to Director");
            return director;
        });
    })
    .catch(err=>{
        console.log("Error Occured");
    })
}