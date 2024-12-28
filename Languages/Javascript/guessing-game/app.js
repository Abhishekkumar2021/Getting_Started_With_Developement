#! /usr/bin/env node

import { stdin, stdout } from "process"
import "readline/promises"
import { createInterface } from "readline/promises"

function getRandumNumber(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a)    // [0, b - a + 1) + a => [a, b+1)
}

async function main() {
    console.log("Welcome to the number guessing game!")
    console.log("I'm thinking of a number between 1 and 100.")
    console.log("Please select the difficulty level: ")
    console.log("1. Easy (10 chances)")
    console.log("2. Medium (5 chances)")
    console.log("3. Hard (3 chances)")
    const reader = createInterface({
        input: stdin,
        output: stdout
    })

    try {
        let chances;
        const diffLevel = parseInt(await reader.question("Enter your choice: "))

        if (diffLevel == 1) {
            chances = 10;
            console.log("Great! You have selected the Easy difficulty level.")
        }
        else if (diffLevel == 2) {
            chances = 5;
            console.log("Great! You have selected the Medium difficulty level.")
        }
        else if (diffLevel == 3) {
            chances = 3;
            console.log("Great! You have selected the Hard difficulty level.")
        }else{
            console.log("Invalid choice!")
            process.exit(1)
        }

        const guessedNum = getRandumNumber(1, 100) // [1, 101)

        let curr = 1;
        while(curr <= chances){
            const num = parseInt(await reader.question("Enter your guess: "))
            if(num == guessedNum){
                console.log( `Congratulations :) You guessed the correct number in ${curr} attempts.`)
                process.exit(0)
            }
            else if(num < guessedNum){
                console.log(`Incorrect! The number is greater than ${num}`)
            }
            else{
                console.log(`Incorrect! The number is less than ${num}`)
            }
            curr++;
        }
    
        console.log(`You failed to guess. Actual number was: ${guessedNum}`)
        reader.close();
        process.exit(0)
    } catch (error) {
        console.log(error)
    }
}

main()