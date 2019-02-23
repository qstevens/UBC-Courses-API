const express = require('express');
const router = express.Router();

router.get('/:session', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to session ' + req.params.session
    });
});


router.get('/:session/:subject', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to subject ' + req.params.session + req.params.subject
    });
});


router.get('/:session/:subject/:course', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to course ' + req.params.session + req.params.subject + req.params.course
    });
});


router.get('/:session/:subject/:course/:section', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to section ' + req.params.session + req.params.subject + req.params.course + req.params.section
    });
});

module.exports = router;