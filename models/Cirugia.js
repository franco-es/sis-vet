import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Cirugia extends Model {
    static associate(models) {
      // Cada cirugía pertenece a una mascota
      this.belongsTo(models.Pet, {
        foreignKey: 'petId',
        as: 'pet',
      });
    }
  }

  Cirugia.init({
    fecha:     { type: DataTypes.STRING, allowNull: false },
    contenido: { type: DataTypes.STRING, allowNull: false },
    petId:     { type: DataTypes.INTEGER}
  }, {
    sequelize,
    modelName: 'Cirugia',
    tableName: 'cirugias',
    timestamps: false
  });

  return Cirugia;
};