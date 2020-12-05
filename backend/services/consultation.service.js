const moment = require('moment');
const { Op } = require('sequelize');
const Clinic = require('../database/models/clinic.model');
const Consultation = require('../database/models/consultation.model');

Clinic.hasMany(Consultation, { foreignKey: 'clinicId' });
Consultation.belongsTo(Clinic, { foreignKey: 'clinicId' });

class ConsultationService {
    findAll = async (clinicId, range) => {
        const today = moment();
        let startDate = today.format('YYYY-MM-DD');
        let endDate = today.format('YYYY-MM-DD');
        switch (range) {
            case 'monthly': {
                startDate = today.startOf('month').format('YYYY-MM-DD');
                endDate = today.endOf('month').format('YYYY-MM-DD');
                break;
            }
            case 'weekly': {
                startDate = today.startOf('week').format('YYYY-MM-DD');
                endDate = today.endOf('week').format('YYYY-MM-DD');
                break;
            }
            case 'daily': {
                startDate = today.format('YYYY-MM-DD');
                endDate = today.add(1, 'day').format('YYYY-MM-DD');
                break;
            }
            default:
                break;
        }
        const dateQuery = range !== 'daily' ? { [Op.between]: [startDate, endDate] } : startDate;
        const consultations = await Consultation.findAll({
            where: {
                clinicId,
                date: dateQuery
            },
            order: [['dateTime', 'DESC']]
        });

        return consultations.map(consultation => {
            return consultation.get({ plain: true });
        }).map(consultation => {
            const date = moment(consultation.date).format('YYYY-MM-DD');
            const time = moment(consultation.time, 'HH:mm').format('HH:mm');
            return {
                ...consultation, date, time
            };
        });
    }

    createRecord = async (payload) => {
        await Consultation.create(payload);
    }
}

exports.consultationService = new ConsultationService();