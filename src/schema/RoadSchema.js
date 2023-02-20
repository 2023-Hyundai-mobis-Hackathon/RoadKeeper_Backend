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
    }
},
)

const Road = mongoose.models.Road || mongoose.model('Road', RoadSchema);

module.exports = Road;