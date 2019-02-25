const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    href: String,
    section: String,
    status: String,
    activity: String,
    term: String,
    interval: String,
    days: String,
    start: String,
    end: String,
    comments: String,
    building: String,
    room: String,
    instructors: Array,

    totalRemaining: Number,
    currentlyRegistered: Number,
    generalRemaining: Number,
    restrictedRemaining: Number,

    subject_code: String,
    course_number: String,
    section_number: String
});

module.exports = mongoose.model('Section', sectionSchema);