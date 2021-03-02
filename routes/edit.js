const express = require('express');
const router = express.Router();
const wrap = require('express-async-wrap')
const models = require('../models');

router.get('/', wrap( async (req, res) => {
    const classes = await models.Class.findAll({
        attributes: ['id', 'name', 'email']
    })
    res.render('edit', { classes });
}))

router.put('/:id', wrap(async (req, res) => {
    const { name, email } = req.body;
    const _class = await models.Class.findByPk(req.params.id);
    _class.name = name, _class.email = email;
    await _class.save();
    res.redirect('/edit');
}))

router.delete('/:id', wrap(async (req, res) => {
    const _class = await models.Class.findByPk(req.params.id);
    await _class.destroy();
    res.redirect('/edit');
}))

module.exports = router;