import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD
} = process.env;

const client = new Pool({
    host: DATABASE_HOST,
    port: 5432,
    database: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD
})

export default client