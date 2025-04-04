import UniqueID from "short-unique-id"
import { Url } from "../model/url.model.js"

export async function shorten(req, res){
    /* 
        We have to create a key corresponding to url like:
        long url: https://www.interviewbit.com/courses/programming/
        short url: BASE_URL/babcd123
    */

    // Extracting long url from body
   const { long_url } = req.body

    // save the data into database
    try {
        let id;

        // If this long_url already exists or not
        const url = await Url.getByLongUrl(long_url)
        if(url) {
            id = url.id
        }
        else {
            const uid = new UniqueID({length: 6, dictionary: 'alpha_lower'})
            id = uid.randomUUID()
            await Url.save(id, long_url)
        }
        res.status(201).json({
            short_url: `http://localhost:8080/${id}`
        })
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error!'
        })
    }
}

export async function redirect(req, res){
    const { url_id } = req.params

    // fetch url details by id 
    try {
        const {long_url, visited_count} = await Url.getById(url_id)
        await Url.updateVisitedCountById(url_id, visited_count + 1)
        res.status(301).redirect(long_url)
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error!'
        })
    }
}