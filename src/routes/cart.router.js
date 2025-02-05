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

cartRouter.put('/cart/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const updatedProducts = req.body.productos;

    try {
        const updatedCart = await manager.actualizarCarrito(cartId, updatedProducts);
        res.json(updatedCart);
    } catch (error) {
        console.log('Error al actualizar el carrito', error);
    }
});

cartRouter.put('/cart/:cid/products/:pid', async (req, res)=>{
    const cartId = req.params.cid
    const productId = req.params.pid
    const { quantity }= req.body

    try {
        const carritoActualizado = await manager.actualizarCantidadProducto(cartId, productId, quantity)
        res.json({
            status:'Success',
            message: 'El carrito fue actualizado exitosamente',
            carritoActualizado
        })
    } catch (error) {
        console.log('Hubo un error al actualizar el carrito', error)
    }
})


cartRouter.delete('/cart/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;

        const updatedCart = await manager.vaciarCarrito(cartId);

        res.json({
            status: 'success',
            message: 'Todos los productos del carrito fueron eliminados correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al vaciar el carrito', error);
    }
});

export default cartRouter