import { existsSync, readFileSync, writeFileSync } from "node:fs";
class CategoryDatabase {
    FILE_PATH;
    categories;
    constructor(FILE_PATH = "src/database/category.db.json", categories = []) {
        this.FILE_PATH = FILE_PATH;
        this.categories = categories;
        this.readCatgoriesFromFile();
    }
    readCatgoriesFromFile() {
        try {
            if (!existsSync(this.FILE_PATH)) {
                writeFileSync(this.FILE_PATH, "");
                return;
            }
            const data = readFileSync(this.FILE_PATH);
            if (data.length === 0)
                return;
            this.categories = JSON.parse(data.toString());
        }
        catch (e) {
            console.log("Error loading categories!");
        }
    }
    writeCatgoriesToFile() {
        try {
            const data = JSON.stringify(this.categories);
            writeFileSync(this.FILE_PATH, data);
        }
        catch (_) {
            console.log("Error writing catgories!");
        }
    }
    getCatgories() {
        return this.categories;
    }
    addCategory(category) {
        category = category.toUpperCase();
        const idx = this.categories.indexOf(category);
        if (idx === -1) {
            this.categories.push(category);
            this.writeCatgoriesToFile();
        }
    }
}
export default CategoryDatabase;
