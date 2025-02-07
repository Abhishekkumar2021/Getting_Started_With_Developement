import pg from 'pg'
import dotenv from "dotenv"

dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DATABASE
} = process.env

const { Client } = pg
const client = new Client({
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT!),
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE
})

await client.connect()
 
const res = await client.query('SELECT name, age FROM "University"."Student" ORDER BY room_no DESC')
console.log(res.rows) // Hello world!
await client.end()