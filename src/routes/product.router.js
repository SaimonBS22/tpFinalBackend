import { Router } from 'express'
import ProductManager from "../managers/product.managerDb.js";

const productRouter = Router()

const manager = new ProductManager()

productRouter.get('/products', async (req, res)=>{
   const productos = await manager.encontrarProducto()
   res.json({
        success:'Exitosamente',
        payload: productos,
        hasPrevPage: productos.hasPrevPage,
        hasNextPage: productos.hasNextPage,
        prevPage: productos.prevPage,
        nextPage: productos.nextPage,
        currentPage: productos.page,
        totalPages: productos.totalPages,
        prevLink: productos.hasPrevPage ? `/products?page=${productos.prevPage}&sort=${sort}&category=${categoria.join(',')}` : null,
        nextLink:productos.hasNextPage ? `/products?page=${productos.nextPage}&sort=${sort}&category=${categoria.join(',')}` : null,
   })
})


productRouter.get('/products/:p_id', async (req, res)=>{
    try {
        const id = req.params.p_id
        const respuesta = await manager.encontrarProductoPorID(id)
        res.json(respuesta)
    } catch (error) {
        console.log('Hubo un error al buscar por ID', error)
    }
})



export default productRouter