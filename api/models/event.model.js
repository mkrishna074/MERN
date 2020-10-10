const mongoose = require('mongoose');

const mediaType = new Object({
    address:{
        type: String,
    },
    type:{
        type: String,
    }
})

const eventSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        max: 15,
        trim: true,
        min: 4
    },
    title: {
        type: String,
        required: true,
        max: 255,
        min: 10
    },
    highlights: [{
        type: String
    }],
    tags: [{
        type: String,
        trim: true,
    }],
    media: [{
        type: mediaType
    }],
    references: [{
        type: String
    }]
},
{
  timestamps: true
})

eventSchema.index({'$**': 'text'});
module.exports = mongoose.model('Event', eventSchema);