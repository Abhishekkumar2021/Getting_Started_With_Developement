import pg from 'pg'
const { Client } = pg
const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "University"
})

await client.connect()
 
const res = await client.query('SELECT name, age FROM "University"."Student" ORDER BY room_no DESC')
console.log(res.rows) // Hello world!
await client.end()