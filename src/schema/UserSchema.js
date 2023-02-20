const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

const UserSchema = new Schema(
{
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
    }
},
)

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;