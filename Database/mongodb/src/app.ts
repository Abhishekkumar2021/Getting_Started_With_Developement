import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const client = new MongoClient(process.env.MONGODB_URL!)

async function getStudentData(){
    const db = client.db("University")
    const collection = db.collection("Students")

    const query = {
        age: {$gt: 15}
    }
    const res =  collection.find(query)
    const students = await res.toArray()
    console.log(students)
    client.close()
}

getStudentData()