const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { user, pass } = require('../config/mail.json');
const models = require('../models');
const wrap = require('express-async-wrap');

// Mail Setting
const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user,
        pass
    }
}))

// Mail Sending Middleware
const send = (req, res, next) => {
    const { subject, to, text } = req.body;
    const attachments = [];
    for (let i = 0; i < req.files.length; i++) {
        attachments.push({
            filename: req.files[i].originalname,
            path: path.join(req.files[i].path)
        })
    }
    transporter.sendMail({
        from: user,
        to: to.split('-')[1],
        subject,
        text,
        attachments
    }, (err, info) => {
        if (!err) {
            next();
        } else {
            next(err);
        }
    })
};

// Multer Setting
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const fName = file.originalname.split('.').slice(0, -1).join('.')
        cb(null, fName + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage })

router.get('/', wrap(async (req, res) => {
    const classes = await models.Class.findAll();
    res.render('mail', { classes });
}))

router.post('/', upload.array('files'), send, wrap(async (req, res) => {
    const { subject, to } = req.body;
    await models.Log.create({
            subject,
            fk_classId: to.split('-')[0],
            attachments: req.files.length
         })
    res.redirect('/send');
}))

module.exports = router;