module.exports = (sequelize,Sequelize)=>{
    const Actor = sequelize.define("actors",{
        name:{
            type: Sequelize.STRING
        }
    });
    return Actor;
}