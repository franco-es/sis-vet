/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vacuna', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    idVeterinario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'veterinarios',
        key: 'id'
      },
      unique: "vacuna_ibfk_2"
    },
    idMascota: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'mascotas',
        key: 'id'
      },
      unique: "vacuna_ibfk_1"
    },
    nombre: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    fecha_aplicacion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    proxima_aplicacion: {
      type: DataTypes.DATEONLY,
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
    tableName: 'vacuna',
    timestamps: false
    });
};
