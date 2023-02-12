'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.Allcode, { foreignKey: 'keyMap', targetKey: 'keyMap' })
      //Schedule.hasMany(models.User, { foreignKey: 'doctorId', targetKey: 'id', as: 'scheduleDoctor' })
      Schedule.hasMany(models.Doctor_infor, { foreignKey: 'doctorId', targetKey: 'doctorId', as: 'scheduleDoctor' })
    }
  }
  Schedule.init({
    date: DataTypes.STRING,
    month: DataTypes.STRING,
    year: DataTypes.STRING,
    day: DataTypes.STRING,
    doctorId: DataTypes.STRING,
    keyMap: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};