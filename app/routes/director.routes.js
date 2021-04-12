const {authJwt} = require('../middleware');
module.exports = app =>{

    const director = require('../controller/director.controller');
    const router = require('express').Router();

    router.post('/',[authJwt.verifyToken,authJwt.isAdmin],director.create);
    router.get('/',director.findAll);
    router.get('/:id',director.findDirectorById);
    router.delete('/:id',[authJwt.verifyToken,authJwt.isAdmin],director.delete);

    app.use('/api/director',router);
}