const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

const DangerSchema = new Schema(
{
    category: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    accuracy: {
        type: Number,
        required: true,
        trim: true
    },
},
)

const Danger = mongoose.models.Danger || mongoose.model('Danger', DangerSchema);

module.exports = Danger;