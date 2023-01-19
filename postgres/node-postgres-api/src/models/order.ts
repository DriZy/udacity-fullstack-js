// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import Client from '../database'
import dotenv from 'dotenv'
import order from "../handlers/order";

dotenv.config()


export type Order = {
    id?: number;
    status?: string;
    user_id: number;
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get articles. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get article ${id}. Error: ${err}`)
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (name, price) VALUES($1, $2) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [order.status, order.user_id])

            const createdOrder :Order = result.rows[0]

            conn.release()

            return createdOrder
        } catch (err) {
            throw new Error(`Could not add order ${order.id}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            const article = result.rows[0]

            conn.release()

            return article
        } catch (err) {
            throw new Error(`Could not delete article ${id}. Error: ${err}`)
        }
    }
    async addOrder(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
            const sql = 'INSERT INTO order_orders (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await Client.connect()

            const result = await conn
                .query(sql, [quantity, orderId, productId])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        // get order to see if it is open
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)'
            //@ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(ordersql, [orderId])

            const order = result.rows[0]

            if (order.status !== "open") {
                throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
            }

            conn.release()
        } catch (err) {
            throw new Error(`${err}`)
        }

        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await Client.connect()

            const result = await conn
                .query(sql, [quantity, orderId, productId])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }
}