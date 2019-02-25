const mongoose = require('mongoose');

const subjectTreeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: String,
    link: String,
    title: String,
    faculty: String,
    courses: Array
});

module.exports = mongoose.model('Treesubject', subjectTreeSchema);