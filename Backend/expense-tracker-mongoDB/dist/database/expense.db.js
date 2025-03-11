import Expense from "../models/expense.model.js";
import { dateToString } from "../utility/date.utils.js";
import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("ExpensesTracker");
const collection = db.collection("Expense");
export async function add_expense(amount, description, category, createdDate) {
    if (!createdDate) {
        createdDate = dateToString(new Date());
    }
    else {
        createdDate = dateToString(new Date(createdDate));
    }
    const id = new ObjectId();
    const expense = new Expense(id, description, category, amount, createdDate, dateToString(new Date()));
    const res = await collection.insertOne(expense);
    console.log(res.insertedId);
    return res.insertedId;
}
export async function get_all_expenses() {
    const expenses = await collection.find({}).toArray();
    console.log(expenses);
    return expenses;
}
export async function get_expense_by_ID(id) {
    const query = {
        _id: id
    };
    const expense = await collection.findOne(query);
    console.log(expense);
    return expense;
}
export async function update_expense(id, amount, description, category) {
    const filter = { _id: id };
    const update = { $set: { amount: amount, description: description, category: category } };
    const res = await collection.updateOne(filter, update);
    console.log(res.modifiedCount);
    return res.modifiedCount;
}
export async function delete_Expense(id) {
    const filter = { _id: id };
    const res = await collection.deleteOne(filter);
    console.log(res);
    return res.deletedCount;
}
export async function total_expense() {
    const result = await collection.aggregate([
        { $group: { _id: null, total: { $sum: "$amount" } } }
    ]).toArray();
    return result.length > 0 ? result[0].total : 0;
}
export async function expense_of_all_months() {
    const result = await collection.aggregate([
        { $group: {
                _id: { month: { $month: { $toDate: "$createdDate" } }, year: { $year: { $toDate: "$createdDate" } } },
                total: { $sum: "$amount" }
            } }
    ]).toArray();
    return result;
}
export async function expense_of_month(month) {
    const expenses = await collection.find({
        createdDate: {
            $regex: `^${month.padStart(2, '0')}`
        }
    }).toArray();
    return expenses;
}
export async function expense_of_all_years() {
    const result = await collection.aggregate([
        { $group: {
                _id: { year: { $year: { $toDate: "$createdDate" } } },
                total: { $sum: "$amount" }
            } }
    ]).toArray();
    return result;
}
export async function expense_of_year(year) {
    const expenses = await collection.find({
        createdDate: { $regex: `^${year}-` }
    }).toArray();
    return expenses;
}
export async function expense_by_categories() {
    const result = await collection.aggregate([
        { $group: { _id: "$category", total: { $sum: "$amount" } } }
    ]).toArray();
    return result;
}
export async function expense_of_category(category) {
    const expenses = await collection.find({ category }).toArray();
    return expenses;
}
export async function expense_of_range(from, to) {
    const expenses = await collection.find({
        createdDate: { $gte: from, $lte: to }
    }).toArray();
    return expenses;
}
