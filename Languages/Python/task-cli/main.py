#!/usr/bin/env python3

import sys

args = sys.argv
argc = len(args)

if argc < 2:
    print(f"Usage: {args[0]} <command> <options>")
    exit(1)
    
commands = set([
    "list",
    "add",
    "delete",
    "update",
    "show"
])

command = args[1]

if command not in commands:
    print("Invalid Command!")
    print("Available commands are:")
    idx = 1
    for item in commands:
        print(f"{idx}. {item}")
        idx += 1
        
class Task:
    def __init__(self, title: str, id: int, status: str) -> None:
        self.title = title
        self.id = id
        self.status = status
        
    def show(self) -> None:
        print("--------------------------------")
        print(f"ID: {self.id}")
        print(f"Title: {self.title}")
        print(f"Status: {self.status}")
        print("--------------------------------")

def write_tasks_to_file(tasks: list[Task]) -> None:
    try:
        file = open("tasks.txt", "w")
        
        lines: list[str] = []
        for task in tasks:
            line = str(task.id) + " " + task.status + " " + task.title
            lines.append(line)
        
        data = "\n".join(lines)
        file.write(data)
        
        file.close()
    except Exception as e:
        print("Error writing tasks!")
        exit(1)
           
tasks: list[Task] = []
CURRENT_ID = 1

# Load task from Secondary --> Primary memory
file = open("tasks.txt", "r")
line = file.readline()
line = line.replace("\n", "")
while line != "":
    words = line.split(" ")
    
    # Handling Task ID
    id = int(words[0])
    CURRENT_ID = max(CURRENT_ID, id + 1)
    
    # Handling Task Status
    status = words[1]
    
    # Handling Task title
    remaining_words = words[2:]
    title = " ".join(remaining_words)
    
    task = Task(title, id, status)
    tasks.append(task)
    
    line = file.readline()
    line = line.replace("\n", "")

if command == "list":
    if argc == 2:
        for task in tasks:
            task.show()
    elif argc == 3:
        status = args[2]
        if status != "TODO" and status != "IN_PROGRESS" and status != "DONE":
            print("Invalid status! Status should be one of [TODO, IN_PROGRESS, DONE]")
            exit(1)
            
        for task in tasks:
            if task.status == status:
                task.show()
                       
elif command == "show":
    if argc < 3:
        print(f"Usage: {args[0]} show <ID>")
        exit(1)
        
    found = False
    id = int(args[2])
    for task in tasks:
        if task.id == id:
            task.show()
            found = True
        
    if not found:
        print("Invalid task ID!")
        exit(1)

elif command == "add":
    if argc < 3:
        print(f"Usage: {args[0]} add \"<title>\"")
        exit(1)
    
    title = args[2]
    task = Task(title, CURRENT_ID, "TODO")
    CURRENT_ID += 1
    tasks.append(task)
    write_tasks_to_file(tasks)
    
elif command == "delete":
    if argc < 3:
        print(f"Usage: {args[0]} delete <ID>")
        exit(1)
    id = int(args[2])
    found = False
    
    idx = 0
    for task in tasks:
        if task.id == id:
            tasks.pop(idx)
            found = True
        idx += 1
        
    if not found:
        print("Invalid task ID!")
        exit(1)
        
    write_tasks_to_file(tasks)

elif command == "update":
    if argc < 5:
        print(f"Usage: {args[0]} update <ID> STATUS/TITLE <status>/\"<title>\"")
        exit(1)
    
    id = int(args[2])
    if args[3] == "STATUS":
        status = args[4]
        if status != "TODO" and status != "IN_PROGRESS" and status != "DONE" :
            print("Invalid status! Status should be out of [TODO, IN_PROGRESS, DONE")
            exit(1)
            
        found = False
        for task in tasks:
            if task.id == id:
                task.status = status
                found = True
                
        if not found :
            print("Invalid task ID!")
            exit(1)
            
        write_tasks_to_file(tasks)
    elif args[3] == "TITLE":
        title = args[4]
        found = False
        for task in tasks:
            if task.id == id:
                task.title = title
                found = True
                
        if not found :
            print("Invalid task ID!")
            exit(1)
            
        write_tasks_to_file(tasks)
    else:
        print(f"Usage: {args[0]} update <ID> STATUS/TITLE <status>/\"<title>\"")
        exit(1)
        