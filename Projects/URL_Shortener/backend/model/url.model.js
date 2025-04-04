import { runQuery } from "../db/client.js";

export class Url{
    // Save method
    static async save(id, long_url){
        // This will save the details to database
        try {
            const res = await runQuery('INSERT INTO url(id, long_url) VALUES ($1, $2)', [id, long_url])
        } catch (error) {
            console.log(error)
        }
    }

    // Read
    static async getById(id){
        // Read url by ID from database
        try {
            const res = await runQuery('SELECT * FROM url WHERE id = $1', [id])
            return res.rows[0]
        } catch (error) {
            console.log(error)
        }
    }

    static async getByLongUrl(long_url){
        try {
            const res = await runQuery('SELECT * FROM url WHERE long_url = $1', [long_url])
            if(res.rows.length > 0) return res.rows[0]
            console.log(res.rows)
            return undefined
        } catch (error) {
            console.log(error)
        }
    }

    static async updateVisitedCountById(id, visitedCount){
        // Update visited count
        try {
            const res = await runQuery('UPDATE url SET visited_count = $1 WHERE id = $2', [visitedCount, id])
            return res.rows[0]
        } catch (error) {
            console.log(error)
        }
    }
}