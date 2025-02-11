import mongoose from "mongoose";

const parameterSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    keywords: [String],
    length: {
        type: Number,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    content_created: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true
});

const parameter = mongoose.model('Parameter', parameterSchema);
export default parameter;