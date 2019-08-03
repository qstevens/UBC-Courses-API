const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');
const Course = require('../models/course');
const Section = require('../models/section');
const connectionMap = require('../../connection'); 

let rp = require('request');
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
        let courseUrl = getCourseUrl(req);
        rp(courseUrl, (error, response, body) => {
            let $ = cheerio.load(body);
            let mainTable = $('table');
            let tbody = $('tbody', mainTable);
            let status = "";
            $('tr', tbody)
                .each((i, elem) => {
                    // console.log(i + " elem:" + $(elem).text());
                    let td = $(elem).children().first();
                    // console.log(td.text())
                    let currStatus = td.text();
                    td = td.next();
                    // console.log(td.text())
                    // console.log("doc section: " + doc.section)
                    if (td.text() === doc.section) {
                        status = currStatus;
                    }
                })
            doc.status = status;
            console.log(status);
            rp(url, (error, response, body) => {
            let $ = cheerio.load(body);
            // Get Tables on Page (should contain a sectionTable, instructorTable, seatTable, bookTable)
            let tables = $('table');

            // Add Seat Summary to Section
            let seatTable = tables[3];
            console.log(tables);
            console.log("table 3: " + seatTable)
            tables.each((i, elem) => {
                let tableHead = $('thead', elem);
                console.log("table: " + elem)
                console.log(tableHead.text());
                if (tableHead.text() === "Seat Summary") {
                    seatTable = elem;
                }
            });
            let seatBody = $('tbody', seatTable);

            let currSeat = $('tr', seatBody).first();
            let totalRemaining = $('td', currSeat).first().next().text();

            currSeat = currSeat.next();
            let currentlyRegistered = $('td', currSeat).first().next().text();

            currSeat = currSeat.next();
            let generalRemaining = $('td', currSeat).first().next().text();
            
            currSeat = currSeat.next();
            let restrictedRemaining = $('td', currSeat).first().next().text();
            
            doc.totalRemaining = totalRemaining;
            doc.currentlyRegistered = currentlyRegistered;
            doc.generalRemaining = generalRemaining;
            doc.restrictedRemaining = restrictedRemaining;
            res.status(200).json(doc);
        })
        })
        

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
function getCourseUrl(req) {
    let session = req.params.session;
    let sessionCd = session.substring(4, 5);
    let sessionYr = session.substring(0, 4);
    let subject = req.params.subject;
    let course = req.params.course;
    let url = "https://courses.students.ubc.ca/cs/courseschedule?sesscd="
        + sessionCd
        + "&pname=subjarea&tname=subj-course&course="
        + course
        + "&sessyr="
        + sessionYr
        + "&dept="
        + subject;

    return url;
}

