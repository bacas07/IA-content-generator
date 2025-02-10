import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parameterID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parameter',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const content = mongoose.model('Content', contentSchema);
export default content;