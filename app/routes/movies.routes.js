const {authJwt} = require('../middleware');


module.exports = app => {

    const movies = require('../controller/movies.controller');
    
    const router = require('express').Router();

    router.post('/',[authJwt.verifyToken,authJwt.isAdmin],movies.create);
    router.get('/',movies.findAll);
    router.get('/:id',movies.findOne);
    router.put('/:id',[authJwt.verifyToken,authJwt.isAdmin],movies.update);
    router.delete('/:id',[authJwt.verifyToken,authJwt.isAdmin],movies.delete);
    router.delete('/',[authJwt.verifyToken,authJwt.isAdmin],movies.deleteAll);

    app.use('/api/movies',router);
};