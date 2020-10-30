'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const {initModels} = require('./init-models')

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// removed autoloading block
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// setting the list of used models
const models = [
  require('./vacuna')(sequelize, Sequelize),
  require('./veterinaria')(sequelize, Sequelize),
  require('./veterinarios')(sequelize, Sequelize),
  require('./owner')(sequelize, Sequelize),
  require('./mascotas')(sequelize, Sequelize),
  require('./consulta')(sequelize, Sequelize),
  require('./cirugia')(sequelize, Sequelize),
];

// registering models by their names
models.forEach(model => {
  db[model.name] = model;
});

// using registered models to set up relations
models.forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
