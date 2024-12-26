#!/usr/bin/env node
import fs from "node:fs"

class Task {
    constructor(title, id, status) {
        this.title = title;
        this.id = id;
        if(status) this.status = status;
        else this.status = "TODO";
    }

    show() {
        console.log("--------------------------------");
        console.log(`ID: ${this.id}`);
        console.log(`Title: ${this.title}`);
        console.log(`Status: ${this.status}`);
        console.log("--------------------------------");
    }
};

// Write to file
function writeTasksToFile(tasks) {
    try {
        const lines = [];
        for (let task of tasks) {
            const line = task.id + " " + task.status + " " + task.title;
            lines.push(line);
        }

        const data = lines.join("\n");

        fs.writeFileSync("tasks.txt", data);
    } catch (_) {
        console.log("Error writing tasks!");
        process.exit(1);
    }
}

const args = process.argv.slice(1);
args[0] = `./${args[0].split("/").pop()}`;
const argc = args.length;

if (argc < 2) {
    console.log(`Usage: ${args[0]} <command> <options>`);
    process.exit(1)
}

const command = args[1];

const commands = new Set([
    "list",
    "add",
    "delete",
    "update",
    "show"
]);

if (!commands.has(command)) {
    console.log("Invalid command!");
    console.log("Available commands:");
    let idx = 1;
    for (let command of commands) {
        console.log(`${idx}. ${command}`);
        idx++;
    }
    process.exit(1);
}

const tasks = [];
let CURRENT_ID = 1;

// Load tasks from secondary to primary memory
try {
    const data = fs.readFileSync("tasks.txt", "utf-8");
    const lines = data.split("\n");
    for (let line of lines) {
        if(line === "") continue;
        const words = line.split(" ");

        // Handling task ID
        const id = parseInt(words[0]);
        CURRENT_ID = Math.max(CURRENT_ID, id + 1);

        // Handling task STATUS
        const status = words[1];

        // Handling task TITLE
        const remainingWords = words.slice(2);
        const title = remainingWords.join(" ");

        const task = new Task(title, id, status);
        tasks.push(task)
    }
} catch (_) {
    console.log("Error loading tasks!");
    process.exit(1);
}

if (command === "list") {
    if (argc == 2) {
        for (let task of tasks) {
            task.show();
        }
        process.exit(0);
    }
    else if (argc == 3) {
        const status = args[2];
        if (status !== "TODO" && status !== "IN_PROGRESS" && status !== "DONE") {
            console.log("Invalid status! Status should be one of [TODO, IN_PROGRESS, DONE]");
            process.exit(1);
        }
        for (let task of tasks) {
            if (task.status === status) {
                task.show();
            }
        }
        process.exit(0);
    }
    else {
        console.log("Invalid number of arguments!");
        process.exit(1);
    }
}
else if (command === "show") {
    if (argc < 3) {
        console.log(`Usage: ${args[0]} show <ID>`);
        process.exit(1);
    }
    else {
        const id = parseInt(args[2]);
        for (let task of tasks) {
            if (task.id === id) {
                task.show();
                process.exit(0);
            }
        }
        console.log("Task not found!");
        process.exit(1);
    }
}
else if (command === "add") {
    if (argc < 3) {
        console.log(`Usage: ${args[0]} add "<title>"`);
        process.exit(1);
    }
    const title = args[2];
    const task = new Task(title, CURRENT_ID);
    CURRENT_ID++;
    tasks.push(task);
    writeTasksToFile(tasks);
}
else if (command === "delete") {
    if (argc < 3) {
        console.log(`Usage: ${args[0]} delete <ID>`);
        process.exit(1);
    }
    const id = parseInt(args[2]);
    let found = false;

    let idx = 0;
    for (let task of tasks) {
        if (task.id === id) {
            tasks.splice(idx, 1);
            found = true;
        }
        idx++;
    }

    if (!found) {
        console.log("Task with given ID is not found!");
        process.exit(1);
    }

    writeTasksToFile(tasks);
}
else if (command === "update") {
    if (argc < 5) {
        console.log(`Usage: ${args[0]} update <ID> STATUS/TITLE <status>/"<title>"`);
        process.exit(1);
    }

    if (args[3] === "STATUS") {
        const id = parseInt(args[2]);
        const status = args[4];

        if (status !== "TODO" && status !== "IN_PROGRESS" && status !== "DONE") {
            console.log("Invalid status! Status should be out of [TODO, IN_PROGRESS, DONE");
            process.exit(1);
        }

        let found = false;
        for (let task of tasks) {
            if (task.id === id) {
                task.status = status;
                found = true;
            }
        }
        if (!found) {
            console.log("Task not found!");
            process.exit(1);
        }
        writeTasksToFile(tasks);
        process.exit(0);
    }
    else if(args[3] === "TITLE"){
        const id = parseInt(args[2]);
        const title = args[4];

        let found = false;
        for(let task of tasks){
            if(task.id === id){
                task.title = title;
                found = true;
            }
        }
        if(!found){
            console.log("Task not found!");
            process.exit(1);
        }
        writeTasksToFile(tasks);
        process.exit(0);
    }
    else{
        console.log(`Usage: ${args[0]} update <ID> STATUS/TITLE <status>/"<title>"`);
        process.exit(1);
    }
}