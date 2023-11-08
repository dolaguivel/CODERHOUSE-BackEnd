import { Router } from "express";

const productRouter = Router()

// Ruta principal
productRouter.get('/realtimeproducts', async (req, res) => {
    try {
        res.render('realTimeProducts', { })
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

export default productRouter