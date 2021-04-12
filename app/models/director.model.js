module.exports = (sequelize,Sequelize)=>{
    const Director = sequelize.define("director",{
        name:{
            type: Sequelize.STRING
        }
    });
    return Director;
}