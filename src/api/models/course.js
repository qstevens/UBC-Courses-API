const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    course_name: String,
    subject_code: String,
    course_title: String,
    course_link: String,
    sections: Array,
    credits: Number,
    description: String
});

module.exports = mongoose.model('Course', courseSchema);