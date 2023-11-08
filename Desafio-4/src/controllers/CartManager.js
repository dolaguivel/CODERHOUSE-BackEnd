import fs from 'fs'

class CartManager {
    constructor() {
        this.cart = []
        this.path = './src/db/cart.json'
    }

    // Crear nuevo carrito
    async createCart() {
        try {
            const existFile = fs.existsSync(this.path)
            if (existFile) {
                const cartFile = await fs.promises.readFile(this.path, 'utf-8')
                let newCart = JSON.parse(cartFile)

                let lastCart = undefined

                if (newCart.length > 0) {
                    lastCart = newCart[newCart.length - 1].id + 1
                }

                newCart.push({
                    id: lastCart || 1,
                    products: []
                })

                await fs.promises.writeFile(this.path, JSON.stringify(newCart, null, 2))

                return 'Cart created successfully'
            } else {
                await fs.promises.writeFile(this.path, JSON.stringify([{ id: 1, products: [] }], null, 2))
                return 'Cart created successfully'
            }

        } catch (error) {
            throw new Error(error)
        }
    }

    // Listar los productos que pertenezcan al carrito con el parámetro cid proporcionados
    async getCartById(id) {
        try {
            const cartFile = await fs.promises.readFile(this.path, 'utf-8')
            let newCart = JSON.parse(cartFile)

            const cartId = newCart.find((cart) => cart.id === id)

            if (!cartId) {
                return 'Not Found'
            }

            return cartId
        } catch (error) {
            throw new Error(error)
        }
    }

    // Agregar el producto al arreglo “products” del carrito seleccionado
    async addProductInCart(id, productId) {
        try {
            const cartFile = await fs.promises.readFile(this.path, 'utf-8')
            let newCart = JSON.parse(cartFile)
    
            const cartId = newCart.find((cart) => cart.id === id)
            let verifyProduct = cartId.products.find((product) => product.productId === productId)
    
            if (!cartId) {
                return 'Not Found'
            }
    
            if (!verifyProduct) {
                cartId.products.push({ productId, quantity: 1})
                await fs.promises.writeFile(this.path, JSON.stringify(newCart, null, 2))
            } else {
                const newQuantity = verifyProduct.quantity + 1
                verifyProduct.quantity = newQuantity
                await fs.promises.writeFile(this.path, JSON.stringify(newCart, null, 2, { ...verifyProduct }))
                return 'Product is already in cart, quantity +1' 
            }
    
            return `Product added in cart ${id}`
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default CartManager



