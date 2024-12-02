import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    'sysvet',
    'root',
    'root',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

export { sequelize };
