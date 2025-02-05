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
async actualizarCarrito(cartId, updatedProducts) {
    try {
        const cart = await cartModel.findById(cartId);

        if (!cart) {
            console.log('Carrito no encontrado');
        }

        cart.productos = updatedProducts;

        cart.markModified('products');

        await cart.save();

        return cart;
    } catch (error) {
        console.error('Error al actualizar el carrito', error);
        throw error;
    }
}


async actualizarCantidadProducto(cartId, productoId, newQuantity){
        try {
            if(!mongoose.Types.ObjectId.isValid(cartId)){
                console.log(`El id es invalido: ${cartId}`)
                return null
            }
            if(!mongoose.Types.ObjectId.isValid(productoId)){
                console.log(`El id es invalido: ${productoId}`)
                return null
            }
            const carrito = await cartModel.findById(cartId)

            const productoEnCarrito = carrito.productos.find(p => p.producto.toString() === productoId)
            if(!productoEnCarrito){
                console.log('No esta el producto en este carrito')
                return null
            }

            productoEnCarrito.quantity = newQuantity || 1
            await carrito.save()
            return carrito
        } catch (error) {
            console.log('Hubo un error al actualizar el carrito', error)
        }
}

}


export default CartManager