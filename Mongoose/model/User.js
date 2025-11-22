const mongoose = require('mongoose');
const { refreshUsers } = require('../../User_Roles/controllers/refreshHandle');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        user:{
        type: Number,
        default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
});

module.exports = mongoose.model('User', UserSchema);