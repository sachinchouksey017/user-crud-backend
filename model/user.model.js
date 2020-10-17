const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is required field']
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required field']
    },
    email: {
        type: String,
        required: [true, 'email is required field']
    },
    password: {
        type: String,
        required: [true, 'password is required field']
    },
    profileUrl: {
        type: String,
    },
    mobileNumber: {
        type: String
    }

});

module.exports = mongoose.model('user', userSchema)