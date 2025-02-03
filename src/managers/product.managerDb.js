import mongoose from "mongoose";
import productoModel from "../model/product.model.js";


class ProductManager{

    async agregarProducto({title,description,price,stock,code,thumbnail,category,status}){
       try {
        if(!title || !description || !price || !stock || !code || !thumbnail || !category || !status){
            console.log('Todos los campos son obligatorios')
        }
        const nuevoProducto = new productoModel({
            title,
            description,
            price,
            stock,
            code,
            thumbnail: thumbnail || [],
            category,
            status:true
        })
        await nuevoProducto.save()
    } 
       catch (error) {
        console.log('Hubo un error agregando el producto', error)
       }
}

    async encontrarProducto(){
        try {
            const buscarProductoLimit = await productoModel.find()
            return buscarProductoLimit
        } catch (error) {
            console.log('Hubo un error al intentar de encontrar el producto', error)
        }
    }

    async productoSort(){
        try {
            const sort = await productoModel.find().sort({price:1})
            return sort
        } catch (error) {
            console.log("Hubo un error en el sort", error)
        }
    }

    async encontrarProductoPorID(_id){
        try {
            const buscarPorId = await productoModel.findById(_id)
            return buscarPorId
        }
         catch (error) {
            console.log('Hubo un error encontrando el producto por ID', error)
        }
    }
}




export default ProductManager