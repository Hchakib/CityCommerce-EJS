const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    Categorie: {
        type: String,
        required: [true, 'Please enter the categorie']
    },
    Titre: {
        type: String,
        required: [true, 'Please enter the titre'],
    },
    Description: {
        type: String,
        required: [true, 'Please enter the description'],
    },
    Prix: {
        type: Number,
        required: [true, 'Please enter the prix']
    },
    Taille: {
        type: String,
        required: [true, 'Please enter the taille'],
    },
    Username: {
        type: String,
        required: [true, 'Please enter the username'],
    },
    Stock: {
        type: Number,
        required: [true, 'Please enter the stock'],
    },
    Photo: {
        type: String,
        required: [true, 'Please enter the photo'],
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;