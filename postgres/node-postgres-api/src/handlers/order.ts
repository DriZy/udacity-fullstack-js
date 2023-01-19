import express, {Request, Response} from "express";
import {Order, OrderStore} from "../models/order";
// @ts-ignore
import jwt from 'jsonwebtoken'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
    const articles = await store.index()
    res.json(articles)
}

const show = async (req: Request, res: Response) => {
    const article = await store.show(req.params.id)
    res.json(article)
}

// const create = async (req: Request, res: Response) => {
//     try {
//         const authorizationHeader = req.headers.authorization
//         // @ts-ignore
//         const token = authorizationHeader.split(' ')[1]
//         jwt.verify(token, process.env.JWT_TOKEN_PAS)
//     } catch(err) {
//         res.status(401)
//         res.json('Access denied, invalid token')
//         return
//     }
//
//     try {
//         const order: Order = {
//             title: req.body.title,
//             content: req.body.content,
//         }
//
//         const newArticle = await store.create(article)
//         res.json(newArticle)
//     } catch(err) {
//         res.status(400)
//         res.json(err)
//     }
// }
const destroy = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization
        // @ts-ignore
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_TOKEN_PAS)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    try {
        const deleted = await store.delete(req.body.id)
        res.json(deleted)
    } catch (error) {
        res.status(400)
        res.json({ error })
    }
}


const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    // app.post('/orders', create)
    // add product
    app.post('/orders/:id/products', addProduct)
}

// ... other methods
const addProduct = async (_req: Request, res: Response) => {
    const orderId: string = _req.params.id
    const productId: string = _req.body.productId
    const quantity: number = parseInt(_req.body.quantity)

    try {
        const addedProduct = await store.addProduct(quantity, orderId, productId)
        res.json(addedProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
export default orderRoutes
