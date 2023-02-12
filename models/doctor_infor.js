'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor_infor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor_infor.belongsTo(models.User, { foreignKey: 'doctorId', targetKey: 'id', as: 'doctorData' })
      Doctor_infor.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceData' })
      Doctor_infor.belongsTo(models.Schedule, { foreignKey: 'doctorId', targetKey: 'doctorId', as: 'scheduleDoctor' })
      Doctor_infor.belongsTo(models.Markdown, { foreignKey: 'doctorId', targetKey: 'doctorId', as: 'markdownData' })
      Doctor_infor.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceData' })
      Doctor_infor.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentData' })
    }
  }
  Doctor_infor.init({
    doctorId: DataTypes.STRING,
    priceId: DataTypes.STRING,
    provinceId: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    addressClinic: DataTypes.STRING,
    nameClinic: DataTypes.STRING,
    note: DataTypes.STRING,
    count: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Doctor_infor',
  });
  return Doctor_infor;
};