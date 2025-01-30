import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'


const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    code:{
        type:String,
        required:true,
        unique:true
    },
    thumbnail:{
        type:[String],
        required:true
    },
    category:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    }
})

productSchema.plugin(mongoosePaginate)

const productoModel = mongoose.model('products', productSchema)

export default productoModel