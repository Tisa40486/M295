const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        nom: String,
        description: String,
        prix: Number,
        quantityStock: Number,
    }
)   

module.exports = productSchema; 
