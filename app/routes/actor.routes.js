const {authJwt} = require('../middleware');

module.exports = app =>{

    
     const actor = require('../controller/actor.controller');
     const router = require('express').Router();
  
     router.post('/',[authJwt.verifyToken,authJwt.isAdmin],actor.create);
     router.delete('/:id',[authJwt.verifyToken,authJwt.isAdmin],actor.delete);
     router.get('/',actor.findAll);
     router.get('/:id',actor.findActorById);


     app.use('/api/actor',router);
} 

