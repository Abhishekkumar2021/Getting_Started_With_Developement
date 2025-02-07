class Expense {
    _id;
    description;
    category;
    amount;
    created;
    updated;
    constructor(_id, description, category, amount, created, updated) {
        this._id = _id;
        this.description = description;
        this.category = category;
        this.amount = amount;
        this.created = created;
        this.updated = updated;
    }
}
export default Expense;
