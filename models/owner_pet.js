const { Model, DataTypes } = require('sequelize');
const veteModel = require('./users');

class Consulta extends Model {}
class Vacuna extends Model {}
class Cirugia extends Model {}
class Owner extends Model {}
class Pet extends Model {}

module.exports = (sequelize) => {
  // Modelo Veterinario
  const { Veterinario } = veteModel(sequelize);

  // Modelo Consulta
  Consulta.init(
    {
      fecha: { type: DataTypes.STRING, allowNull: false },
      contenido: { type: DataTypes.STRING, allowNull: false },
      diagnostico: { type: DataTypes.STRING, allowNull: false },
      tratamiento: { type: DataTypes.STRING, allowNull: false },
      photo: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: 'Consulta',
      timestamps: false,
    }
  );

  // Modelo Vacuna
  Vacuna.init(
    {
      nombre: { type: DataTypes.STRING, allowNull: false },
      fecha: { type: DataTypes.STRING, allowNull: false },
      prox_aplicacion: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: 'Vacuna',
      timestamps: false,
    }
  );

  // Modelo Cirugia
  Cirugia.init(
    {
      fecha: { type: DataTypes.STRING, allowNull: false },
      contenido: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Cirugia',
      timestamps: false,
    }
  );

  // Modelo Owner
  Owner.init(
    {
      nombre: { type: DataTypes.STRING, allowNull: false },
      apellido: { type: DataTypes.STRING, allowNull: false },
      telefono: { type: DataTypes.STRING, allowNull: true },
      direccion: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: 'Owner',
      timestamps: false,
    }
  );

  // Modelo Pet
  Pet.init(
    {
      nombre: { type: DataTypes.STRING, allowNull: false },
      especie: { type: DataTypes.STRING, allowNull: false },
      raza: { type: DataTypes.STRING, allowNull: false },
      color: { type: DataTypes.STRING, allowNull: false },
      f_nacimiento: { type: DataTypes.DATE, allowNull: true },
      photo: { type: DataTypes.STRING, allowNull: true },
      created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      modelName: 'Pet',
      timestamps: false,
    }
  );

  // Relaciones
  Veterinario.hasMany(Consulta, { foreignKey: 'veteId', as: 'consultas' });
  Consulta.belongsTo(Veterinario, { foreignKey: 'veteId', as: 'vete' });

  Veterinario.hasMany(Vacuna, { foreignKey: 'veteId', as: 'vacunas' });
  Vacuna.belongsTo(Veterinario, { foreignKey: 'veteId', as: 'vete' });

  Veterinario.hasMany(Cirugia, { foreignKey: 'veteId', as: 'cirugias' });
  Cirugia.belongsTo(Veterinario, { foreignKey: 'veteId', as: 'vete' });

  Veterinario.hasMany(Owner, { foreignKey: 'veteId', as: 'owners' });
  Owner.belongsTo(Veterinario, { foreignKey: 'veteId', as: 'vete' });

  Owner.hasMany(Pet, { foreignKey: 'ownerId', as: 'pets' });
  Pet.belongsTo(Owner, { foreignKey: 'ownerId', as: 'owner' });

  Veterinario.hasMany(Pet, { foreignKey: 'veteId', as: 'pets' });
  Pet.belongsTo(Veterinario, { foreignKey: 'veteId', as: 'vete' });

  Pet.hasMany(Consulta, { foreignKey: 'petId', as: 'consultas' });
  Consulta.belongsTo(Pet, { foreignKey: 'petId', as: 'pet' });

  Pet.hasMany(Vacuna, { foreignKey: 'petId', as: 'vacunas' });
  Vacuna.belongsTo(Pet, { foreignKey: 'petId', as: 'pet' });

  Pet.hasMany(Cirugia, { foreignKey: 'petId', as: 'cirugias' });
  Cirugia.belongsTo(Pet, { foreignKey: 'petId', as: 'pet' });

  return { Veterinario, Consulta, Vacuna, Cirugia, Owner, Pet };
};