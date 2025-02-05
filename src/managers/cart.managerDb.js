import mongoose from 'mongoose'
import cartModel from '../model/cart.model.js'


class CartManager{
         
    async crearCarrito(){
        try {
            const nuevoCarrito = new cartModel({productos:[]})
            await nuevoCarrito.save()
            return nuevoCarrito
        } catch (error) {
            console.log('Hubo un error en la funcion crearCarrito', error)
        }
    }


    async encontrarCarritoId(cartId){
        try {
            const carritoId = await cartModel.findById(cartId).populate('productos.producto')
            if(!carritoId){
                console.log('No existe carrito con ese id')
                return null
            }
            return carritoId
        } catch (error) {
            console.log("Hubo un error en la funcion carritoId", error)
        }
    }

async agregarAlCarrito(cartId, productoId, quantity){
   try {
    const carritoId = await this.encontrarCarritoId(cartId)
    const existeProducto = carritoId.productos.find(item=>{item.producto.toString()=== productoId})

    if(existeProducto){
        existeProducto.quantity += quantity
    }else{
        carritoId.productos.push({producto: productoId, quantity})
    }

    await carritoId.save()
    return carritoId
   } catch (error) {
        console.log('Hubo un error en la funcion agregarAlCarrito', error)
   }
}

async eliminarProductoCarrito(cartId, productId){
    try {
        const carrito = await cartModel.findById(cartId)

       carrito.productos =  carrito.productos.filter(item => item.producto._id.toString() !== productId)

       await carrito.save()
       return carrito
    } catch (error) {
        console.log('hubo un error al intentar borrar un producto del carrito', error)
    }

}

}


export default CartManager