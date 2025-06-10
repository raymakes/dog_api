const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        owner: { // who registered dog
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        adoptedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        adoptedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Dog', DogSchema);