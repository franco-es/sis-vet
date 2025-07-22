import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Consulta extends Model {
    static associate(models) {
      // Cada consulta pertenece a una mascota
      this.belongsTo(models.Pet, {
        foreignKey: 'petId',
        as: 'pet',
        onDelete:  'CASCADE',
      onUpdate:  'CASCADE'
      });
    }
  }

  Consulta.init({
    fecha:       { type: DataTypes.STRING, allowNull: false },
    contenido:   { type: DataTypes.STRING, allowNull: false },
    diagnostico: { type: DataTypes.STRING, allowNull: false },
    tratamiento: { type: DataTypes.STRING, allowNull: false },
    photo:       { type: DataTypes.STRING, allowNull: true },
    petId:       { type: DataTypes.INTEGER}
  }, {
    sequelize,
    modelName: 'Consulta',
    tableName: 'consultas',
    timestamps: false
  });

  return Consulta;
};