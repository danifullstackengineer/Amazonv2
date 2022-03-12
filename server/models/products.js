import mongoose from 'mongoose';

const productsTable = mongoose.Schema({
    title: String,
    image: String,
    price: Number,
    rating: Number,
    id: String
})

export default mongoose.model('Products', productsTable)