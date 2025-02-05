import {Router} from 'express'
import productoModel from '../model/product.model.js'
import ProductManager from '../managers/product.managerDb.js'
import CartManager from '../managers/cart.managerDb.js'

const viewsRouter = Router()
const manager = new ProductManager()
const cartManager = new CartManager()

viewsRouter.get("/", async (req, res)=>{
    try {
    const { limit=5, page = 1, sort, category } = req.query

    const products = await manager.encontrarProducto({
      limit: parseInt(limit) || 5,
      page: parseInt(page) || 1,
      sort,
      category
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
        currentSort: sort
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

viewsRouter.get('/cart/:cid', async (req, res)=>{
      const cartId = req.params.cid
   try {
      const carrito = await cartManager.encontrarCarritoId(cartId)

      const productoCarrito = carrito.productos.map(item=>({
         producto: item.producto.toObject(),
         quantity: item.quantity
      }))
      res.render('cart',{
         productos: productoCarrito
      })
   } 
   catch (error) {
      console.log('Hubo un error al renderizar los productos del carrito', error)
   }
})

export default viewsRouter