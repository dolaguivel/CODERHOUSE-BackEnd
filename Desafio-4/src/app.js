import express from 'express'
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';

const PORT = 8080
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)


// Llamando al servidor en puerto
app.listen(PORT, () => {
    console.log(`Server on in port ${PORT}`)
})