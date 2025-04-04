import pg from 'pg'
import {DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER} from "../config/variables.js"

const { Client } = pg
 
const client = new Client({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_DATABASE,
})

export async function runQuery(query, values){
    return await client.query(query, values)
}
export default client;