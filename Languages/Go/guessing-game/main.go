package main

import (
	"fmt"
	"math/rand/v2"
	"os"
)

func main() {
	fmt.Println("Welcome to the number guessing game!")
	fmt.Println("I'm thinking of a number between 1 and 100.")
	var diffLevel int
	var chances int
	fmt.Println("Please select the difficulty level: ")
	fmt.Println("1. Easy (10 chances)")
	fmt.Println("2. Medium (5 chances)")
	fmt.Println("3. Hard (3 chances)")
	fmt.Printf("Enter your choice: ")
	fmt.Scanf("%d", &diffLevel)
	if diffLevel == 1 {
		chances = 10
		fmt.Println("Great! You have selected the Easy difficulty level.")
	} else if diffLevel == 2 {
		chances = 5
		fmt.Println("Great! You have selected the Medium difficulty level.")
	} else if diffLevel == 3 {
		chances = 3
		fmt.Println("Great! You have selected the Hard difficulty level.")
	} else {
		fmt.Println("Choose the correct level first!")
		os.Exit(1)
	}
	fmt.Println("Let's start the game!")

	curr := 1
	guessedNum := rand.IntN(100) + 1
	for curr <= chances {
		var num int
		fmt.Printf("Enter your guess: ")
		fmt.Scanf("%d", &num)
		if num == guessedNum {
			fmt.Printf("Congratulations! You guessed the correct number in %d attempts.\n", curr)
			os.Exit(0)
		} else if num < guessedNum {
			fmt.Printf("Incorrect! The number is greater than %d \n", num)
		} else {
			fmt.Printf("Incorrect! The number is less than %d \n", num)
		}
		curr++
	}

	fmt.Printf("You failed to guess! Actual number was: %d\n", guessedNum)
}
