import { Router } from "express";
import ProductManager from '../controllers/ProductManager.js'
import CartManager from "../controllers/CartManager.js"

const cartManager = new CartManager()
const productManager = new ProductManager()
const cartRouter = Router()


// Crear un nuevo carrito
cartRouter.post('/', async (req, res) => {
    try {
        const cart = await cartManager.createCart()
        return res.send(cart)
    } catch (error) {
        res.status(500).send('Internal server error');
    }
})

// Obtener carrito segun id
cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = +req.params.cid
        const data = await cartManager.getCartById(cartId)
        res.json(data)
    } catch (error) {
        res.status(500).send('Internal server error');
    }
})

cartRouter.post('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = +req.params.cid
        const productId = +req.params.pid
        const productById = await productManager.getProductsById(productId)

        if (!productById.id) {
            res.status(400).send(`The product with id: ${productId}, not exist!`)
            return
        }

        const data = await cartManager.addProductInCart(cartId, productId)
        res.json(data)

    } catch (error) {
        res.status(500).send('Internal server error');
    }
})

export default cartRouter