'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('consultations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      clinic: {
        type: DataTypes.STRING,
        allowNull: false
      },
      patient: {
        type: DataTypes.STRING,
        allowNull: false
      },
      doctor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      diagnosis: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      fee: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      medication: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false
      },
      dateTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      clinicId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'clinics',
          key: 'id'
        },
      },
      followUp: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('consultations');
  }
};
