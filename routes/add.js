const express = require('express');
const router = express.Router();
const models = require('../models');
const wrap = require('express-async-wrap');

router.get('/', (req, res) => {
    res.render('form');
});

router.post('/', wrap(async (req, res) => {
    const { name, email } = req.body;
    console.log(req.body);

    await models.Class.create({ name, email })
    res.redirect('/add');
}))

module.exports = router;