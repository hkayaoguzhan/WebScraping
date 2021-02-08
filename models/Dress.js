const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dress = new Schema({
    id: String,
    title: String,
    description: String,
    images: Array,
    datePublished: {
        type: Date,
        default: Date.now(),
    },
    productCategory: String,
    color: String,
    prices: Array,
    discount: Boolean


});

module.exports = mongoose.model("states", Dress);
