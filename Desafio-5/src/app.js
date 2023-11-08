import express from 'express';
import { engine } from 'express-handlebars';
import { resolve } from 'path';
import { Server } from 'socket.io'
import homeRouter from './routes/home.router.js';
import productRouter from './routes/products.router.js';
import ProductManager from './controllers/ProductManager.js';


const productManager = new ProductManager()

void (async () => {
    try {
        const SERVER_PORT = 8083;

        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        const viewsPath = resolve('src/views');

        app.engine('handlebars', engine({
            layoutsDir: `${viewsPath}/layouts`,
            defaultLayout: `${viewsPath}/layouts/main.handlebars`,
        }));

        app.set('view engine', 'handlebars');
        app.set('views', viewsPath);

        // Ruta principal
        app.use('/', homeRouter)

        // Ruta para crear productos
        app.use('/', productRouter)


        const httpServer = app.listen(SERVER_PORT, () => {
            console.log(`Conectado al server en el puerto: ${SERVER_PORT}`);
        });

        
        const socketServer = new Server(httpServer)

        socketServer.on('connection', async (socket) => {

            console.log('Nuevo cliente conectado')

            const products = await productManager.getProducts()
            socket.emit('listProduct', products)

            //Add Producto
            socket.on('addProduct', async (data) => {
                await productManager.addProduct(data)
                socket.emit('listProduct', products);
            });

            //Delete Producto
            socket.on('deleteProduct', async (data) => {
                await productManager.deleteProduct(+data)
                socket.emit('listProducts', products)
            })

        })
    }
    catch (e) {
        console.log(e);
    }
})()

