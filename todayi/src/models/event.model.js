const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        max: 25,
        unique: true,
        min: 6
    },
    title: {
        type: String,
        required: true,
        max: 255,
        trim: true,
        min: 25
    },
    highlights: [{
        type: String
    }],
    tags: [{
        type: String
    }],
    media: [{
        type: String
    }]
},
{
  timestamps: true
})


module.exports = mongoose.model('Event', eventSchema);