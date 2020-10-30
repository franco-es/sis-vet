/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('veterinarios', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    idVeterinaria: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'veterinaria',
        key: 'id'
      },
      unique: "veterinarios_ibfk_1"
    },
    nombre: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    matricula: {
      type: DataTypes.INTEGER(6),
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
    tableName: 'veterinarios',
    timestamps: false
    });
};
