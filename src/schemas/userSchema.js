import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'developer', 'user'],
        default: 'user'
    },
    is_active: {
        type: Boolean,
        default: true
    },
    parameters_created: {
        type: Number,
        default: 0,
        min: 0
    },
    content_created: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true
});

const user = mongoose.model('User', userSchema);
export default user;