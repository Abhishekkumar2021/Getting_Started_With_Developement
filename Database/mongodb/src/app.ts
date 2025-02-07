import { MongoClient } from "mongodb"

const client = new MongoClient("mongodb://localhost:27017")

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