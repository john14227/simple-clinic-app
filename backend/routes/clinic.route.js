const express = require('express');
const moment = require('moment');
const { consultationService } = require('../services/consultation.service');

class ClinicRoute {
    constructor(consultationService) {
        this.consultationService = consultationService;
    }

    router() {
        const router = express.Router();
        router.get('/record/:timeRange', this.listConsultationRecord);
        router.post('/record', this.createConsultationRecord);
        return router;
    }

    listConsultationRecord = async (req, res) => {
        try {
            const { timeRange } = req.params;
            const clinicId = req.user && req.user.id;
            const consultations = await this.consultationService.findAll(clinicId, timeRange);
            res.json({ success: true, consultations });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    }

    createConsultationRecord = async (req, res) => {
        try {
            const clinicId = req.user && req.user.id;
            const { time, date, ...data } = req.body;
            const payload = { ...data, clinicId, date, time, dateTime: moment(`${date}T${time}`) };
            await this.consultationService.createRecord(payload);
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    }
}

exports.clinicRoute = new ClinicRoute(consultationService);


