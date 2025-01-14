import { readFileSync, writeFileSync } from "node:fs";
export class UserDatabase {
    constructor() {
        this.USER_FILE_PATH = "src/db/users.json";
        this.users = [];
        // load the users from the file
        this.loadUsers();
    }
    loadUsers() {
        const fileData = readFileSync(this.USER_FILE_PATH);
        const jsonString = fileData.toString();
        if (jsonString !== "")
            this.users = JSON.parse(jsonString);
        for (const user of this.users) {
            user.createdAt = new Date(user.createdAt);
            user.updatedAt = new Date(user.updatedAt);
        }
    }
    writeUsers() {
        const jsonString = JSON.stringify(this.users);
        writeFileSync(this.USER_FILE_PATH, jsonString);
    }
    getAllUsers() {
        return this.users;
    }
    getUserById(id) {
        return this.users.find(user => user.id === id);
    }
    getUserByUsername(username) {
        return this.users.find(user => user.username === username);
    }
    getUserByEmail(email) {
        return this.users.find(user => user.email === email);
    }
    createUser(user) {
        this.users.push(user);
        this.writeUsers();
    }
    updateUserById(id, user) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users[index] = user;
            this.writeUsers();
        }
        return index;
    }
    deleteUserById(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
            this.writeUsers();
        }
        return index;
    }
    getMaxId() {
        let maxId = 0;
        for (const user of this.users) {
            if (user.id > maxId) {
                maxId = user.id;
            }
        }
        return maxId;
    }
}
