const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

const DangerSchema = new Schema(
{
    category: {
        type: String,
    },
    location: {
        type: String,
    },
    accuracy: {
        type: Number,
    },
    user_id: {
        type: Types.ObjectId,
    },
    quick: {
        type: Boolean,
    },
    complete: {
        type: Boolean,
    },
    danger_score: {
        type: Number
    }
},
)

const Danger = mongoose.models.Danger || mongoose.model('Danger', DangerSchema);

module.exports = Danger;