import { Router } from "express";
import CartManager from "../managers/cart.managerDb.js";
import cartModel from "../model/cart.model.js";


const manager = new CartManager()


const cartRouter = Router()

cartRouter.post('/cart', async (req,res)=>{
    try {
        const nuevoCarrito = await manager.crearCarrito()
        res.json(nuevoCarrito)
    } catch (error) {
        console.log('Hubo un error en el post de cartRouter', error)
    }
})

cartRouter.get('/cart/:cid', async (req, res)=>{
    const cartId = req.params.cid
    try {
        const carrito = await cartModel.findById(cartId)
        return res.json(carrito.productos)
    } catch (error) {
        console.log('hubo un error al buscar el id del carrito', error)
    }
})

cartRouter.post('/cart/:cid/products/:pid', async (req, res)=>{
        const cartId = req.params.cid
        const productId = req.params.pid
        const quantity = req.body.quantity || 1
    try {
        const actualizararrito = await manager.agregarAlCarrito(cartId,productId,quantity)
        res.json(actualizararrito.productos)
    } catch (error) {
        console.log('hubo un error al tratar de agregar al carrito', error)
    }
})

cartRouter.delete('/cart/:cid/products/:pid', async (req, res)=>{
   try {
    const cartId = req.params.cid
    const productId = req.params.pid

    const eliminarDelCarrito = await manager.eliminarProductoCarrito(cartId, productId)

    res.json({
        status: 'Success',
        message: 'Producto eliminado',
        eliminarDelCarrito
    })
   } catch (error) {
        console.log('Hubo un error eliminando el producto', error)
   }

})


export default cartRouter