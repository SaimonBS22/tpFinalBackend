import { Router } from 'express'
import ProductManager from "../managers/product.managerDb.js";

const productRouter = Router()

const manager = new ProductManager()

productRouter.get('/products', async (req, res)=>{
    try {
        const {limit=5, page=4, sort, category} = req.query
    
        const productos = await manager.encontrarProducto({
         limit,
         page,
         sort,
         category
        })
        res.json({
             success:'Exitosamente',
             payload: productos,
             hasPrevPage: productos.hasPrevPage,
             hasNextPage: productos.hasNextPage,
             prevPage: productos.prevPage,
             nextPage: productos.nextPage,
             currentPage: productos.page,
             totalPages: productos.totalPages,
             prevLink: productos.hasPrevPage ? `/products?limit=${limit}&page=${productos.prevPage}&sort=${sort}&&category=${category}` : null,
             nextLink:productos.hasNextPage ? `/products?limit=${limit}&page=${productos.nextPage}&sort=${sort}&category=${category}` : null,
        })
    } catch (error) {
        console.log('Hubo un error en productRouter', error)
    }
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