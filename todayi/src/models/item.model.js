const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 255,
        unique: true,
        min: 25
    },
    highlights: [{
        type: String
    }],
    tags: [{
        type: String
    }]
})

module.exports = mongoose.model('Item', itemSchema);