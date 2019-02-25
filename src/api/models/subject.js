const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: String,
    link: String,
    title: String,
    faculty: String,
    courses: Array
});

module.exports = mongoose.model('Subject', subjectSchema);