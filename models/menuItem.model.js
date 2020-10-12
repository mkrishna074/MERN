const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
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
    },
    component: {
        type: String,
        required: true,
        max: 25,
        trim: true,
        min: 3
    }
},
{
  timestamps: true
})


module.exports = mongoose.model('MenuItem', menuItemSchema);