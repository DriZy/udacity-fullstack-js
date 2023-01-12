import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import client from "./database";

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', async function (req: Request, res: Response) {
    try {
        const connection = await client.connect()
        console.log(connection)
        res.send(connection)
    }catch (error){
        console.log(error)
        res.send((error as any).message)
    }
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
export default app
