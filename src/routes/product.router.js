import { Router } from 'express'
import ProductManager from "../managers/product.managerDb.js";
import productoModel from '../model/product.model.js';

const productRouter = Router()

const manager = new ProductManager()

productRouter.get('/api', async (req, res)=>{
   const resultado = await productoModel.find()
   res.send(resultado)
})

 productRouter.get("/", async (req, res)=>{
     try {
      const page = req.params.page || 1
      const limit = 5
      const products =  await productoModel.paginate({},{limit, page})
   
      const recuperarProducto = products.docs.map(product =>{
         const {_id, ...rest} = product.toObject()
         return rest
      } )
      
      res.render("productos",{
         products: recuperarProducto,
         hasPrevPage: products.hasPrevPage,
         hasNextPage: products.hasNextPage,
         prevPage: products.prevPage,
         nextPage: products.nextPage,
         currentPage: products.page,
         totalPages: products.totalPages
      }
      )
     } catch (error) {
      console.log('hubo un error en handlebars', error)
     }
 })

productRouter.get('/:p_id', async (req, res)=>{
    try {
        const id = req.params.p_id
        const respuesta = await manager.encontrarProductoPorID(id)
        res.json(respuesta)
    } catch (error) {
        console.log('Hubo un error al buscar por ID', error)
    }
})



export default productRouter