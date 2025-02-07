import { MongoClient } from "mongodb";
const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("ExpenseTracker");
const collection = db.collection("Category");
export async function add_category(category) {
    category = category.toUpperCase();
    const res = await collection.insertOne({ category });
    return res.insertedId;
}
export async function get_categories() {
    const res = collection.find({}).toArray;
    return res;
}
