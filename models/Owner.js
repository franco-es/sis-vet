import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Owner extends Model {
    static associate(models) {
      // Un propietario tiene muchas mascotas
      this.hasMany(models.Pet, {
        foreignKey: 'ownerId',
        as: 'pets',
        onDelete:  'CASCADE',
      onUpdate:  'CASCADE'
      });
    }
  }

  Owner.init({
    nombre:    { type: DataTypes.STRING, allowNull: false },
    apellido:  { type: DataTypes.STRING, allowNull: false },
    telefono:  { type: DataTypes.STRING, allowNull: false },
    direccion: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'Owner',
    tableName: 'owners',
    timestamps: false
  });

  return Owner;
};