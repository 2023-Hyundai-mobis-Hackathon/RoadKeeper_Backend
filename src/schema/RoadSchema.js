const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

const RoadSchema = new Schema(
{
    road_name: {
        type: String,
    },
    danger_number: {
        type: Number
    },
    garbage_num: {
        type: Number,
    },
    pothole_num: {
        type: Number,
    },
    animal_num: {
        type: Number
    },
    complete_num: {
        type: Number
    },
    road_score: {
        type: Number
    }
},
)

const Road = mongoose.models.Road || mongoose.model('Road', RoadSchema);

module.exports = Road;