const express = require('express');
const router = express.Router();
const wrap = require('express-async-wrap');
const models = require('../models');

router.get('/', wrap(async (req, res) => {
    const logs = await models.Log.findAll({
        attributes: ['subject', 'attachments', 'createdAt'],
        include: [{
            model: models.Class,
            attributes: ['name']
        }],
        order: [['updatedAt', 'DESC']]
    })
    const classes = await models.Class.findAll();
    res.render('log', {logs, classes });
}));

router.get('/:id', wrap(async (req, res) => {
    const logs = await models.Log.findAll({
        attributes: ['subject', 'attachments', 'createdAt'],
        include: [{
            model: models.Class,
            attributes: ['name'],
            where: { id: req.params.id }
        }],
        order: [['updatedAt', 'DESC']]
    })
    const classes = await models.Class.findAll();
    res.render('log', {logs, classes });
}))

module.exports = router;