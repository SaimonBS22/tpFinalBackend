import { Router } from 'express'
import ProductManager from "../managers/product.managerDb.js";

const productRouter = Router()

const manager = new ProductManager()

productRouter.get('/:p_id', async (req, res)=>{
    try {
        const id = req.params.p_id
        const respuesta = await manager.encontrarProducto(id)
        res.json(respuesta)
    } catch (error) {
        console.log('Hubo un error al buscar por ID', error)
    }
})



export default productRouter