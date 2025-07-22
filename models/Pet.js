import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Pet extends Model {
    static associate(models) {
      // Cada mascota pertenece a un propietario
      this.belongsTo(models.Owner, {
        foreignKey: 'ownerId',
        as: 'owner',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
      // Relaciones de historial médico
      this.hasMany(models.Consulta, {
        foreignKey: 'petId',
        as: 'consultas',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
      this.hasMany(models.Vacuna, {
        foreignKey: 'petId',
        as: 'vacunas',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
      this.hasMany(models.Cirugia, {
        foreignKey: 'petId',
        as: 'cirugias',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
    }
  }

  Pet.init({
    nombre:        { type: DataTypes.STRING, allowNull: false },
    especie:       { type: DataTypes.STRING, allowNull: false },
    raza:          { type: DataTypes.STRING, allowNull: false },
    color:         { type: DataTypes.STRING, allowNull: false },
    f_nacimiento:  { type: DataTypes.DATE,   allowNull: false },
    photo:         { type: DataTypes.STRING, allowNull: true },
    ownerId:       { type: DataTypes.INTEGER }
  }, {
    sequelize,
    modelName: 'Pet',
    tableName: 'pets',
    timestamps: false
  });

  return Pet;
};