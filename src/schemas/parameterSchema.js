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
    }
}, {
    timestamps: true
});

const parameter = mongoose.model('Parameter', parameterSchema);
export default parameter;