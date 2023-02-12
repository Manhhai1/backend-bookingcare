'use strict';

const { STRING } = require('sequelize');
const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      doctorId: {
        type: Sequelize.STRING
      },
      paymentId: {
        type: Sequelize.STRING
      },
      namePatient: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      patientId: {
        type: Sequelize.STRING
      },
      scheduleId: {
        type: Sequelize.STRING
      },
      provinceId: {
        type: Sequelize.STRING
      },
      dayofbirth: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      genderId: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      acceptBooking: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};