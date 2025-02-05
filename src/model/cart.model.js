import mongoose, { Schema } from "mongoose";


const cartSchema = new mongoose.Schema({
    productos:[
        {
            producto:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'products',
                required: true
            },
            quantity:{
                type: Number,
                required: true
            }
        }
    ]
})

const cartModel = mongoose.model('carts', cartSchema)

export default cartModel