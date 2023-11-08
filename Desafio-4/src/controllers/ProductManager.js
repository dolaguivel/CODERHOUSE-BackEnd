import fs from 'fs'

class ProductManager {
    constructor() {
        this.product = []
        this.path = './src/db/products.json'
    }

    // Obtener productos
    async getProducts() {
        try {
            const productFile = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(productFile)
        } catch (error) {
            await fs.promises.writeFile(this.path, '[]')
            return 'This file no exist. One has already been created with an empty array'
        }
    }

    // Agregar producto
    async addProduct(product) {
        try {
            if (product.status === true || !product.status) {
                product.status = true
            }

            if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
                return 'One of the data has been entered incorrectly, please verify'
            }

            const existFile = fs.existsSync(this.path)

            if (existFile) {
                const productFile = await fs.promises.readFile(this.path, 'utf-8')
                let newProduct = JSON.parse(productFile)

                const verifyCode = newProduct.find((p) => p.code === product.code)

                if (verifyCode) {
                    return 'The product is already in the list'
                }

                let lastProduct = undefined

                if (newProduct.length > 0) {
                    lastProduct = newProduct[newProduct.length - 1].id + 1
                }

                newProduct.push({
                    ...product,
                    id: lastProduct || 1
                })

                await fs.promises.writeFile(this.path, JSON.stringify(newProduct, null, 2))

                return 'Product added successfully'
            } else {
                await fs.promises.writeFile(this.path, JSON.stringify([{ ...product, id: 1 }], null, 2))
                return 'Product added successfully'
            }

        } catch (error) {
            throw new Error(error)
        }
    }

    // Obtener producto segun el id
    async getProductsById(id) {
        try {
            const productFile = await fs.promises.readFile(this.path, 'utf-8')
            let newProduct = JSON.parse(productFile)

            const productId = newProduct.find((product) => product.id === id)

            if (!productId) {
                return 'Not Found'
            }

            return productId
        } catch (error) {
            throw new Error(error)
        }
    }

    // Actualizar data de un producto
    async updateProduct(id, productData) {
        try {
            const productFile = await fs.promises.readFile(this.path, 'utf-8')
            let newProduct = JSON.parse(productFile)

            const newProductData = newProduct.map((p) => {
                const newData = p.id === id ? { ...p, ...productData } : p
                return newData
            })

            await fs.promises.writeFile(this.path, JSON.stringify(newProductData, null, 2))

            return 'Updated product successfully'
        } catch (error) {
            throw new Error(error)
        }

    }

    // Borrar un producto segun su id
    async deleteProduct(id) {
        try {
            const productFile = await fs.promises.readFile(this.path, 'utf-8')
            let newProduct = JSON.parse(productFile)

            const filterProduct = newProduct.filter((p) => p.id !== id)

            await fs.promises.writeFile(this.path, JSON.stringify(filterProduct, null, 2))

            return 'Updated file successfully'
        } catch (error) {
            throw new Error(error)
        }

    }
}


export default ProductManager



