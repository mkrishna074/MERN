const mongoose = require('mongoose');

const eventTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 25,
        trim: true,
        min: 5
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
{
  timestamps: true
})


module.exports = mongoose.model('EventType', eventTypeSchema);