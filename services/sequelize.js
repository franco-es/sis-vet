import Sequelize from "sequelize";
const conn = {};

const db = new Sequelize('sys_vet_db', 'root', 'root',{
    host: 'localhost',
    dialect:'mysql',
    logging: false
});

conn.sequelize = db;
conn.Sequelize = Sequelize;


export {conn, db};