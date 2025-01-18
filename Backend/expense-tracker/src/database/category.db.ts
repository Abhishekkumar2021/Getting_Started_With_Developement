import { v4 as uuid } from "uuid"
import Expense from "../models/expense.model.js";
import { dateToString, stringToDate } from "../utility/date.utils.js";
import { existsSync, readFileSync, writeFileSync } from "node:fs"

class CategoryDatabase {
    constructor(
        public FILE_PATH: string = "src/database/category.db.json",
        public categories: string[] = []
    ) {
        this.readCatgoriesFromFile();
    }

    readCatgoriesFromFile() {
        try {
            // Check if file exists
            if (!existsSync(this.FILE_PATH)) {
                writeFileSync(this.FILE_PATH, "");
                return;
            }

            const data = readFileSync(this.FILE_PATH);
            if (data.length === 0) return;

            this.categories = JSON.parse(data.toString());
        } catch (e) {
            console.log("Error loading categories!");
        }
    }

    writeCatgoriesToFile() {
        try {
            const data = JSON.stringify(this.categories);
            writeFileSync(this.FILE_PATH, data);
        } catch (_) {
            console.log("Error writing catgories!");
        }
    }

    getCatgories() {
        return this.categories;
    }

    addCategory(category: string){
        category = category.toUpperCase();
        const idx = this.categories.indexOf(category);
        if (idx === -1) {
            this.categories.push(category);
            this.writeCatgoriesToFile();
        }
    }



}

export default CategoryDatabase;
