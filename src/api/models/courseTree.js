const mongoose = require('mongoose');

const courseTreeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    course_name: String,
    subject_code: String,
    course_title: String,
    course_link: String,
    sections: Object,
    credits: Number,
    description: String
});

module.exports = mongoose.model('Treecourse', courseTreeSchema);