import express from 'express'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'
import productoModel from './model/product.model.js'
import ProductManager from './managers/product.managerDb.js'
import productRouter from './routes/product.router.js'


 const app = express()

 app.use(express.json())
 app.use(express.urlencoded({extended: true}))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")


 const PUERTO = 5555

 app.listen(PUERTO, ()=>{
    console.log(`Escuchando en el puerto ${PUERTO}`)
 })

 mongoose.connect('mongodb+srv://simonblaksley:pepo300523@cluster0.1xoua.mongodb.net/entregaFinal?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{console.log('Conectado a MongoDb')})
.catch((err)=>{console.error('Hubo un error', err)})

const manager = new ProductManager()



app.get('/server', async (req, res)=>{
     await productoModel.find()
    const resultado = await productoModel.find()
    res.send(resultado)
 })

 app.get("/inicio", async (req, res)=>{
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


 app.use('/products', productRouter)