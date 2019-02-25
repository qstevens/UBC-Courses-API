const express = require('express');
const router = express.Router();
const SubjectTree = require('../models/subjectTree');
const CourseTree = require('../models/courseTree');
const Section = require('../models/section');
const connectionMap = require('../../connection'); 

router.get('/:session', (req, res, next) => {
    connectionMap[req.params.session].model('Treesubject')
    .find()
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
    });
});

router.get('/:session/:subject', (req, res, next) => {
    connectionMap[req.params.session].model('Treesubject')
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
    connectionMap[req.params.session].model('Treecourse')
    .findOne({course_name: req.params.subject + ' ' + req.params.course})
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
    });
});


router.get('/:session/:subject/:course/:section', (req, res, next) => {
    connectionMap[req.params.session].model('Section')
    .findOne({section: req.params.subject + ' ' + req.params.course + ' ' + req.params.section})
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports = router;
