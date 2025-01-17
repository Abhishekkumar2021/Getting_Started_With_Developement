class Expense{
    constructor(
        public id: string,
        public description: string,
        public category: string,
        public amount: number,
        public created: string,
        public updated: string,
    ){}
}

export default Expense;