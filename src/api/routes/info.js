const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Subject = require('../models/subject');

router.get('/:subject', (req, res, next) => {
    Subject
        .find({code: req.params.subject})
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
        });
});


router.get('/:subject/:course', (req, res, next) => {
    Subject
    .find({code: req.params.subject})
    .exec()
    .then(doc => {
        let course = doc[0].courses[req.params.course];
        console.log(course);
        res.status(200).json(course);
    })
    .catch(err => {
        console.log(err);
    });
});


router.get('/:subject/:course/:section', (req, res, next) => {
    Subject
    .find({code: req.params.subject})
    .exec()
    .then(doc => {
        let course = doc[0].courses[req.params.course];
        let section = course.sections[req.params.section];
        console.log(section);
        res.status(200).json(section);
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports = router;