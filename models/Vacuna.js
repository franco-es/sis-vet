import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Vacuna extends Model {
    static associate(models) {
      // Cada vacuna pertenece a una mascota
      this.belongsTo(models.Pet, {
        foreignKey: 'petId',
        as: 'pet',
        onDelete:  'CASCADE',
      onUpdate:  'CASCADE'
      });
    }
  }

  Vacuna.init({
    nombre:          { type: DataTypes.STRING, allowNull: false },
    fecha:           { type: DataTypes.STRING, allowNull: false },
    prox_aplicacion: { type: DataTypes.STRING, allowNull: true },
    petId:           { type: DataTypes.INTEGER, allowNull: false}
  }, {
    sequelize,
    modelName: 'Vacuna',
    tableName: 'vacunas',
    timestamps: false
  });

  return Vacuna;
};