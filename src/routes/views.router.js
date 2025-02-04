import {Router} from 'express'
import productoModel from '../model/product.model.js'
import ProductManager from '../managers/product.managerDb.js'

const viewsRouter = Router()
const manager = new ProductManager()


viewsRouter.get("/", async (req, res)=>{
    try {
    const { limit=5, page = 1, sort, query } = req.query

    const products = await manager.encontrarProducto({
      limit: parseInt(limit) || 5,
      page: parseInt(page) || 1,
      sort,
      query
    })


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
        currentPage: products.currentPage,
        totalPages: products.totalPages,
     }
     )
    } catch (error) {
     console.log('hubo un error en handlebars', error)
    }
})

viewsRouter.get('/paginate',async (req, res)=>{
   const paginacion= await productoModel.paginate({limit:5, page:4})
   res.json({
      success:'Exitosamente',
        payload: paginacion.docs,
        hasPrevPage: paginacion.hasPrevPage,
        hasNextPage: paginacion.hasNextPage,
        prevPage: paginacion.prevPage,
        nextPage: paginacion.nextPage,
        currentPage: paginacion.page,
        totalPages: paginacion.totalPages,
        prevLink: paginacion.hasPrevPage ? `/products?page=${paginacion.prevPage}&sort=${sort}&category=${categoria.join(',')}` : null,
        nextLink:paginacion.hasNextPage ? `/products?page=${paginacion.nextPage}&sort=${sort}&category=${categoria.join(',')}` : null,
   })
})

export default viewsRouter