const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

const Consultation = sequelize.define('Consultation', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    clinic: {
        type: DataTypes.STRING
    },
    patient: {
        type: DataTypes.STRING
    },
    doctor: {
        type: DataTypes.STRING
    },
    diagnosis: {
        type: DataTypes.TEXT
    },
    fee: {
        type: DataTypes.FLOAT
    },
    medication: {
        type: DataTypes.TEXT
    },
    date: {
        type: DataTypes.DATEONLY
    },
    time: {
        type: DataTypes.TIME
    },
    dateTime: {
        type: DataTypes.DATE
    },
    followUp: {
        type: DataTypes.BOOLEAN
    },
    clinicId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clinics',
            key: 'id'
        },
    }
}, {
    tableName: 'consultations',
});

module.exports = Consultation;