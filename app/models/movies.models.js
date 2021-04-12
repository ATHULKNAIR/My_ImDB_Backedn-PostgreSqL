module.exports = (sequelize,Sequelize)=>{
    const Movies = sequelize.define("movies",{
        title : {
            type : Sequelize.STRING
        },
        released_date:{
           type : Sequelize.STRING
        },
        plot : {
            type : Sequelize.STRING
        },
        genre : {
            type : Sequelize.STRING
        },
        rated : {
            type : Sequelize.STRING
        },
        awards : {
            type : Sequelize.STRING
        }
    });
    return Movies;
};