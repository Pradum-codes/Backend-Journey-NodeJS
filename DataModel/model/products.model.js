import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    imageUrls: [{
        type: String,
        required: true
    }]
}, { timestamps: true });


const Product = mongoose.model('Product', productsSchema);