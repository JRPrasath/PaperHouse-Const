const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    status: {
        type: String,
        enum: ['ongoing', 'completed'],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    completionDate: {
        type: Date
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', projectSchema); 