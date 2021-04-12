const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corOptions ={
    origin : "http://localhost:8081"
};

app.use(cors(corOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const db = require('./app/models');
const MovieCtrl = require('./app/controller/movies.controller');
const Actorctrl = require('./app/controller/actor.controller');
const DirectorCtrl = require('./app/controller/director.controller');

require('./app/routes/actor.routes')(app);
require('./app/routes/comment.routes')(app);
require('./app/routes/movies.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/director.routes')(app);

db.sequelize.sync()
.then(()=>{
    run();
});
// db.sequelize.sync({force : true})
// .then(()=>{
//     console.log("Drop and re-sync db");
//     initial();
// });

const PORT = 5050;
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)
});

const Role = db.role;

const run = async ()=>{
    //  await Actorctrl.addMovie(2,3);
    
    // await DirectorCtrl.addMovies(2,4);
}
function initial(){
    Role.create({
        id :1,
        name : 'user'
    }); 
    Role.create({
        id : 2,
        name : "admin"
    });
}