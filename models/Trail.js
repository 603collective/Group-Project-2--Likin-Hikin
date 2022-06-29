const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trail extends Model { }

Trail.init(
  {
    trail_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    trail_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
      allowNull:false
    },
    length: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER,
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
    modelName: 'trail',
  }
);

module.exports = Trail;
