const {authJwt} = require('../middleware');

module.exports = app =>{
    const comment = require('../controller/comment.controller');
    const router = require('express').Router();

    router.post('/:id',[authJwt.verifyToken],comment.create);
    router.get('/comment',[authJwt.verifyToken,authJwt.isAdmin],comment.findAll);
    router.get('/comment/:id',[authJwt.verifyToken,authJwt.isAdmin],comment.findCommentById);
    router.delete('/comment/:id',[authJwt.verifyToken],comment.delete);
    router.put('/comment/:id',[authJwt.verifyToken],comment.update);

    app.use('/api/movies',router);
};