import express from 'express'
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import productoModel from './model/product.model.js'


 const app = express()

 app.use(express.json())
 app.use(express.urlencoded({extended: true}))

 const PUERTO = 5555
 app.listen(PUERTO, ()=>{
    console.log(`Escuchando en el puerto ${PUERTO}`)
 })

 mongoose.connect('mongodb+srv://simonblaksley:pepo300523@cluster0.1xoua.mongodb.net/entregaFinal?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{console.log('Conectado a MongoDb')})
.catch((err)=>{console.error('Hubo un error', err)})



app.get('/server', async (req, res)=>{
     await productoModel.find()
    const resultado = await productoModel.paginate({}, {limit:1, page:2})
    res.send(resultado)
 })

