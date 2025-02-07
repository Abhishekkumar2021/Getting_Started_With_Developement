import Expense from "../models/expense.model.js";
import { dateToString } from "../utility/date.utils.js";
import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb://localhost:27017")
const db = client.db("ExpensesTracker")
const collection = db.collection("Expense")

export async function add_expense(amount: number, description: string, category: string, createdDate?: string){

    if (!createdDate) {
        createdDate = dateToString(new Date());
    } else {
        createdDate = dateToString(new Date(createdDate))
    }

    const id = new ObjectId()
    const expense:Expense = new Expense(id, description, category, amount, createdDate, dateToString(new Date()))

    const res = await collection.insertOne(expense);
    console.log(res.insertedId)
    return res.insertedId
}

export async function get_all_expenses(){
    const expenses = await collection.find({}).toArray()
    console.log(expenses)
    return expenses
}

export async function get_expense_by_ID(id: ObjectId){
    const query = {
        _id:id
    }
    const expense = await collection.findOne(query)
    console.log(expense)
    return expense
}

export async function update_expense(id: ObjectId, amount: number, description: string, category: string){
    const filter = { _id: id }; // Find by unique ID
    const update = { $set: {amount: amount, description: description, category: category} }; // Update fields
    const res = await collection.updateOne(filter, update)
    console.log(res.modifiedCount)
    return res.modifiedCount
}

export async function delete_Expense(id: ObjectId){
    const filter = { _id: id }; 
    const res = await collection.deleteOne(filter);
    console.log(res)
    return res.deletedCount
}

export async function total_expense(){
    
}

export async function expense_of_all_months(){
    
}

export async function expense_of_month(month: string){

}

export async function expense_of_all_years(){

}

export async function expense_of_year(year: string){

}

export async function expense_by_categories(){

}

export async function expense_of_category(category: string){

}

export async function expense_of_range(from: string, to: string){

}
