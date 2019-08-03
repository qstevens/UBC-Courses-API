const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');
const Course = require('../models/course');
const Section = require('../models/section');
const connectionMap = require('../../connection'); 

let rp = require('request-promise');
let cheerio = require('cheerio');

router.get('/:session', (req, res, next) => {
    connectionMap[req.params.session].model('Subject')
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
    connectionMap[req.params.session].model('Course')
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
        let url = getSectionUrl(req);
        

        return rp(url), doc;
        console.log(doc);
        res.status(200).json(doc);
    })
    .then((req, doc) => {
        let $ = cheerio.load(req);
            // Get Tables on Page (should contain a sectionTable, instructorTable, seatTable, bookTable)
            let tables = $('table');

            // Add Seat Summary to Section
            let seatTable = tables[3];
            let seatBody = $('tbody', seatTable);

            let currSeat = $('tr', seatBody).first();
            let totalRemaining = $('td', currSeat).first().next().text();

            currSeat = currSeat.next();
            let currrentlyRegistered = $('td', currSeat).first().next().text();
            
            currSeat = currSeat.next();
            let generalRemaining = $('td', currSeat).first().next().text();
            
            currSeat = currSeat.next();
            let restrictedRemaining = $('td', currSeat).first().next().text();
            
            doc.totalRemaining = totalRemaining;
            doc.currrentlyRegistered = currrentlyRegistered;
            doc.generalRemaining = generalRemaining;
            doc.restrictedRemaining = restrictedRemaining;

            console.log(doc);
            res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports = router;
function getSectionUrl(req) {
    let session = req.params.session;
    let sessionCd = session.substring(4, 5);
    let sessionYr = session.substring(0, 4);
    let subject = req.params.subject;
    let course = req.params.course;
    let section = req.params.section;
    let url = "https://courses.students.ubc.ca/cs/courseschedule?sesscd="
        + sessionCd
        + "&pname=subjarea&tname=subj-section&course="
        + course
        + "&sessyr="
        + sessionYr
        + "&section="
        + section
        + "&dept="
        + subject;

    return url;
}

