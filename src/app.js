import express from 'express'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'
import productRouter from './routes/product.router.js'
import viewsRouter from './routes/views.router.js'
import cartRouter from './routes/cart.router.js'


 const app = express()

 app.use(express.json())
 app.use(express.urlencoded({extended: true}))
 app.use(express.static('./src/public'));


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


 app.use('/api', productRouter)
 app.use('/', viewsRouter)
 app.use('/api', cartRouter)

