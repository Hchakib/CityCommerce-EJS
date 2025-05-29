const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Name: {
        type: String,
        required: [true, 'Please enter the name'],
    },
    Email: {
        type: String,
        required: [true, 'Please enter the email'],
        unique: true,
    },
    Username: {
        type: String,
        required: [true, 'Please enter the username'],
        unique: true,
    },
    Password: {
        type: String,
        required: [true, 'Please enter the password'],
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;