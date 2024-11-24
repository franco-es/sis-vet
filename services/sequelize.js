import Sequelize from "sequelize";
const conn = {};

const db = new Sequelize('Sys_vet_db', 'root', 'root',{
    host: 'localhost',
    dialect:'mysql',
    operatorsAliases: 'false',
    logging: false
});

conn.sequelize = db;
conn.Sequelize = Sequelize;


export {conn};