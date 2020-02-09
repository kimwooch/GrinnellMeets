const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// product data object
const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    images: {
        type: Array,
        default: []
    },
    clubs: {
        type: Number,
        default: 1
    },
    contact: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        maxlength: 50
    }
}, { timestamps: true })


productSchema.index({
    title: 'text',
    description: 'text',
}, {
    weights: {
        name: 5,
        description: 1,
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }
