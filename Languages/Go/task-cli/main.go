package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Task struct {
	id     int
	title  string
	status string
}

func FindIndex(commands []string, command string) int {
	for i := range len(commands) {
		if commands[i] == command {
			return i
		}
	}
	return -1
}

func GetTasksFromFile() []Task {
	tasks := []Task{}
	data, err := os.ReadFile("tasks.txt")
	if err != nil {
		fmt.Println("Error loading tasks from file!")
		os.Exit(1)
	}

	lines := strings.Split(string(data), "\n")
	for i := range len(lines) {
		words := strings.Split(lines[i], " ")
		id, err := strconv.Atoi(words[0])

		if err != nil {
			fmt.Println("Error reading task ID!")
			os.Exit(1)
		}

		status := words[1]
		remainingWords := words[2:]
		title := strings.Join(remainingWords, " ")

		task := Task{id: id, title: title, status: status}
		tasks = append(tasks, task)
	}

	return tasks
}

func writeTasksToFile(tasks []Task) {
	lines := []string{}
	for i := range len(tasks) {
		line := strconv.Itoa(tasks[i].id) + " " + tasks[i].status + " " + tasks[i].title
		lines = append(lines, line)
	}
	data := strings.Join(lines, "\n")

	os.WriteFile("tasks.txt", []byte(data), 0644)
}

func ShowTask(task Task) {
	fmt.Println("-------------------------------------")
	fmt.Printf("ID: %d\n", task.id)
	fmt.Printf("Status: %s\n", task.status)
	fmt.Printf("Title: %s\n", task.title)
	fmt.Println("-------------------------------------")
}

func main() {
	args := os.Args
	argc := len(args)

	if argc < 2 {
		fmt.Printf("Usage %s <command> <options>\n", args[0])
		os.Exit(1)
	}

	commands := []string{
		"list",
		"add",
		"delete",
		"update",
		"show",
	}

	command := args[1]

	if FindIndex(commands, command) == -1 {
		fmt.Println("Invalid command!")
		fmt.Println("Available commands are: ")
		for i := range len(commands) {
			fmt.Printf("%d. %s\n", (i + 1), commands[i])
		}
	}

	tasks := GetTasksFromFile()
	for i := range len(tasks) {
		ShowTask(tasks[i])
	}
}
