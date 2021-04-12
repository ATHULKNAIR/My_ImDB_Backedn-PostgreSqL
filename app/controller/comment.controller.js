const db= require('../models');
const Comment = db.comment;

exports.create = (req,res)=>{

    Comment.create( {
        movieId : req.params.id,
        name : req.body.name,
        text : req.body.text
       
    })
    .then(comment=>{
        res.send(comment);
    })
    .catch(err=>{
        res.status(500).send({message: "Error Occurred..!"});
    });
};

// Get comments for a given comment id

exports.findCommentById = (req,res)=>{
    const id = req.params.id;
    Comment.findByPk(id,{include:["movies"]})
    .then((comment)=>{
        res.send(comment);
    })
    .catch(err=>{
        res.status(500).send({message : "Error Occurred..!"})
    })
};

// Get All comments

exports.findAll = (req,res)=>{

    Comment.findAll()
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({message:"Error..!"})
    })
}

// delete comment by id

exports.delete = (req,res)=>{
    const id = req.params.id;
    Comment.destroy({
        where:{id:id}
    })
    .then(num=>{
        res.send({message : "deleted Successfully"})
    })
    .catch(err=>{
        res.status(500).send({message : "Not deleted.."})
    })
};

// update comment by id

exports.update = (req,res)=>{

    const id =  req.params.id;
    Comment.update(req.body,{where : {id:id}})
    .then(data=>{
        res.send({message : "Update aakeend mone"})
    })
    .catch(err=>{
        res.status(500).send({message : "Maatan Patanilla"})
    })
}