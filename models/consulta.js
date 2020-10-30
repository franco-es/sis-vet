/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('consulta', {
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
      unique: "consulta_ibfk_3"
    },
    idMascota: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'mascotas',
        key: 'id'
      },
      unique: "consulta_ibfk_2"
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    diagnostico: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    tratamiento: {
      type: DataTypes.STRING(25),
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
    tableName: 'consulta',
    timestamps: false
    });
};
