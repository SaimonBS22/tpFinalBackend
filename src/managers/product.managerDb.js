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

    async encontrarProducto({limit=5,page=4,sort,category } = {}){
        try {
            console.log('Parametros recibidos: ',{limit, page, sort, category})

            const productoCategory = {}
            if(category){
                productoCategory.category = category
            }
            const productoSort = {}
                if(sort === "asc" || sort === "desc"){
                    productoSort.price = sort === 'asc' ? 1: -1
                }
        

            const totalProductos = await productoModel.countDocuments(productoCategory)
            const totalPages = Math.ceil(totalProductos/limit)
            const hasPrevPage = page > 1
            const hasNextPage = page < totalPages

            const buscarProducto = await productoModel.find(productoCategory).sort(productoSort).skip((page-1)*limit).limit(limit)
            return {
                docs:buscarProducto,
                totalPages,
                currentPage: page,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/products?limit=${limit}&page=${page - 1}&sort=${sort}&category=${category}` : null,
                nextLink: hasNextPage ? `/products?limit=${limit}&page=${page + 1}&sort=${sort}&category=${category}` : null,
                currentSort: sort
            }
        } catch (error) {
            console.log('Hubo un error al intentar de encontrar el producto', error)
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