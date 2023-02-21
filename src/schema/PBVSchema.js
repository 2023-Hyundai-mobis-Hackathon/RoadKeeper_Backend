const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

const PBVSchema = new Schema(
{
    status: {
        type: Number
    },
    location: {
        type: String
    }
},
)

const PBV = mongoose.models.PBV || mongoose.model('PBV', PBVSchema);

module.exports = PBV;