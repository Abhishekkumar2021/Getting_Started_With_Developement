class Expense {
    id;
    description;
    category;
    amount;
    created;
    updated;
    constructor(id, description, category, amount, created, updated) {
        this.id = id;
        this.description = description;
        this.category = category;
        this.amount = amount;
        this.created = created;
        this.updated = updated;
    }
}
export default Expense;
