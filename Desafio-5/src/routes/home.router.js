import { Router } from "express";
import ProductManager from '../controllers/ProductManager.js'

const productManager = new ProductManager()

const homeRouter = Router()

// Ruta principal
homeRouter.get('/', async (req, res) => {
    try {
        const product = await productManager.getProducts()
        res.render('index', { title: 'My First Page', product, isAdmin: true })
    } catch (error) {
        res.status(500).send('Internal server error');
    }
    
});


export default homeRouter