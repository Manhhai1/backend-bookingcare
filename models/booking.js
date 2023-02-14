'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Schedule, { foreignKey: 'scheduleId', targetKey: 'id', as: 'scheduleData' })
    }
  }
  Booking.init({
    status: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    genderId: DataTypes.STRING,
    namePatient: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    doctorId: DataTypes.STRING,
    patientId: DataTypes.STRING,
    scheduleId: DataTypes.STRING,
    provinceId: DataTypes.STRING,
    dayofbirth: DataTypes.STRING,
    address: DataTypes.STRING,
    acceptBooking:DataTypes.BOOLEAN,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};