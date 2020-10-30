/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mascotas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    idDuenio: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'owner',
        key: 'id'
      },
      unique: "mascotas_ibfk_1"
    },
    nombre: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    especie: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    raza: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    habilitado: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: 0
    },
    eliminado: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: 0
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'mascotas',
    timestamps: false
    });
};
