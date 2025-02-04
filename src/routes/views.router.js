import {Router} from 'express'
import productoModel from '../model/product.model.js'
import ProductManager from '../managers/product.managerDb.js'

const viewsRouter = Router()
const manager = new ProductManager()


viewsRouter.get("/", async (req, res)=>{
    try {
     const page = req.query.page || 1
     const sort = req.query.sort || 'asc'
     const categoria = req.query.category ? req.query.category.split(',') : []

     const filtro = categoria.length ? {category:{$in: categoria}} : {}

     const limit = 5
     const products =  await productoModel.paginate(filtro,{
        limit, 
        page,
        sort: {price: sort === 'asc' ? 1 :-1},
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
        currentPage: products.page,
        totalPages: products.totalPages,
        prevLink: products.hasPrevPage ? `/products?page=${products.prevPage}&sort=${sort}&category=${categoria.join(',')}` : null,
        nextLink:products.hasNextPage ? `/products?page=${products.nextPage}&sort=${sort}&category=${categoria.join(',')}` : null,
        currentSort: sort
     }
     )
    } catch (error) {
     console.log('hubo un error en handlebars', error)
    }
})


export default viewsRouter