const  Sequelize  = require("sequelize");


const db = new Sequelize('Sys_vet_db', 'root', 'root',{
    host: 'localhost',
    dialect:'mysql'
});

module.exports = db;