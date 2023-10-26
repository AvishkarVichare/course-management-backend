const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lectureSchema = new Schema({
    date: Date,
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'Instructor'
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
});

module.exports = mongoose.model('Lecture', lectureSchema);
