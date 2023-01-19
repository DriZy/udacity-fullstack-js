import express, {Request, Response} from "express";
import {User, UserStore} from "../models/user";
// @ts-ignore
import jwt from 'jsonwebtoken'

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
    const user = await store.show(req.params.id)
    res.json(user)
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
        }

        const newUser = await store.create(user)
        const token = jwt.sign({user: newUser}, process.env.JWT_TOKEN_PAS)
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
    try {
        const authorizationHeader = req.headers.authorization
        // @ts-ignore
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_PAS)

        next()
    } catch (error) {
        res.status(401)
    }
}

const update = async (req: Request, res: Response) => {
    const user: User = {
        id: parseInt(req.params.id),
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
    }
    try {
        const authorizationHeader = req.headers.authorization
        // @ts-ignore
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        if(decoded.id !== user.id) {
            throw new Error('User id does not match!')
        }
    } catch(err) {
        res.status(401)
        res.json(err)
        return
    }

    try {
        const updated = await store.create(user)
        res.json(updated)
    } catch(err) {
        res.status(400)
        // @ts-ignore
        res.json(err + user)
    }
}

const authenticate = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password,
    }
    try {
        const u = await store.authenticate(user.username, user.password)
        var token = jwt.sign({ user: u }, process.env.JWT_TOKEN_PAS);
        res.json(token)
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
}
const userRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', verifyAuthToken, create)
    app.delete('/users/:id', verifyAuthToken, destroy)
}

export default userRoutes
