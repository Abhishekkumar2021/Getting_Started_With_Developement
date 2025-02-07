import { ObjectId } from "mongodb";

class Expense{
    constructor(
        public _id: ObjectId,
        public description: string,
        public category: string,
        public amount: number,
        public created: string,
        public updated: string,
    ){}
}

export default Expense;