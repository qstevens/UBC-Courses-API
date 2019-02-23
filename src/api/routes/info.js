const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');
const connectionMap = require('../../connection'); 

router.get('/:session/:subject', (req, res, next) => {
    connectionMap[req.params.session].model('Subject')
    .findOne({code: req.params.subject})
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
    });
});


router.get('/:session/:subject/:course', (req, res, next) => {
    connectionMap[req.params.session].model('Subject')
    .findOne({code: req.params.subject})
    .exec()
    .then(doc => {
        let course = doc.courses[req.params.course];
        console.log(course);
        res.status(200).json(course);
    })
    .catch(err => {
        console.log(err);
    });
});


router.get('/:session/:subject/:course/:section', (req, res, next) => {
    connectionMap[req.params.session].model('Subject')
    .findOne({code: req.params.subject})
    .exec()
    .then(doc => {
        let course = doc.courses[req.params.course];
        let section = course.sections[req.params.section];
        console.log(section);
        res.status(200).json(section);
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports = router;
