const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

const UserSchema = new Schema(
{
    user_name: {
        type: String
    },
    mileage: {
        type: Number
    },
    danger_num: {
        type: Number,
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
    user_score: {
        type: Number
    }
},
)

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;