const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    lectures: [{
        type: Schema.Types.ObjectId,
         ref: 'Lecture'
    }],
});

module.exports = mongoose.model('Course', courseSchema);
