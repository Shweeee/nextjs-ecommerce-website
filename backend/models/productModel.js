const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  ratings: Number,
  images: Array,
  category: String,
  seller: String,
  stock: Number
}, { collection: 'ecommerce_db' }); // explicitly use your collection

module.exports = mongoose.model('Product', productSchema);
