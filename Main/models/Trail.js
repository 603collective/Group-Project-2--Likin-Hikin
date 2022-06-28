const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Project extends Model { }

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    trailname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
      allowNull:false
    },
    length: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    difficulty: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'project',
  }
);

module.exports = Trail;
