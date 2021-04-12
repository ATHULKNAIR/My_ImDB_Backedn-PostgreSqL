const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host : dbConfig.HOST,
        dialect : dbConfig.dialect,
        operatorAliases : false,
        pool : {
            max : dbConfig.max,
            min : dbConfig.min,
            acquire : dbConfig.acquire,
            idle : dbConfig.idle
        }
    });

    const db = {};
    
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.movies = require('../models/movies.models')(sequelize,Sequelize);
    db.comment = require('../models/comment.model')(sequelize,Sequelize);
    db.user = require('../models/user.model')(sequelize,Sequelize);
    db.role = require('../models/role.model')(sequelize,Sequelize);
    db.actor = require('../models/actor.model')(sequelize,Sequelize);

    // Comment-Movie relation (O-M)

    db.movies.hasMany(db.comment,{as : "comment"});
    db.comment.belongsTo(db.movies,{
        foreignKey:"movieId",
        as: "movies"
    });

    // Actor-Movie relation (M-M)

    db.movies.belongsToMany(db.actor,{
        through : "movies_actor",
        foreignKey : "movieId",
        otherKey : "actorId"
    });
    db.actor.belongsToMany(db.movies,{
        through : "movies_actor",
        foreignKey: "actorId",
        otherKey : "movieId"
    });

    // User-Role relation (M-M)

    db.role.belongsToMany(db.user,{
        through : "user_roles",
        foreignKey : "role_id",
        otherKey : "user_id"
    });
    db.user.belongsToMany(db.role,{
        through : "user_roles",
        foreignKey : "user_id",
        otherKey : "role_id"
    });

    db.ROLES = ["user","admin"];

    
    module.exports = db;