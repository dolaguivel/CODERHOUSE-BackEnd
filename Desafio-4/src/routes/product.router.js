import { Router } from 'express'
import ProductManager from "../controllers/ProductManager.js"

const productManager = new ProductManager()

const productRouter = Router()


// Creacion del producto
productRouter.post('/', async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body
        const productData = { title, description, code, price, status, stock, category, thumbnail }
        const product = await productManager.addProduct(productData)
        res.json(product)
    } catch (error) {
        res.status(500).send('Internal server error');
    }
})


// Obtener todos los productos y poner un limite de cuantos traer por url
productRouter.get('/', async (req, res) => {
    try {
        const limit = +req.query.limit
        const data = await productManager.getProducts()
        if (!limit) {
            return res.send(data)
        } else {
            const dataWithLimit = []
            for (let i = 0; i < limit; i++) {
                dataWithLimit.push(data[i])
            }
            return res.json(dataWithLimit)
        }
    } catch (error) {
        res.status(500).send('Internal server error');
    }
})

// Obtener producto por id
productRouter.get('/:pid', async (req, res) => {
    try {
        const productId = +req.params.pid
        const data = await productManager.getProductsById(productId)
        res.json(data)
    } catch (error) {
        res.status(500).send('Internal server error');
    }

})

// Tomar producto por id y actualizarlo por los campos enviados por body
productRouter.put('/:pid', async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body
        const newData = { title, description, code, price, status, stock, category, thumbnail }
        const productId = +req.params.pid
        const product = await productManager.updateProduct(productId, newData)
        res.json(product)
    } catch (error) {
        res.status(500).send('Internal server error');
    }

})

// Borrar producto segun id seleccionado
productRouter.delete('/:pid', async (req, res) => {
    try {
        const productId = +req.params.pid
        const product = await productManager.deleteProduct(productId)
        res.json(product)
    } catch (error) {
        res.status(500).send('Internal server error');
    }

})

export default productRouter