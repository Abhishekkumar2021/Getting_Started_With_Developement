#! /Users/abhishek/Dev/Akansha/Development/.venv/bin/python3
import sys
import random

print("Welcome to the number guessing game!")
print("I'm thinking of a number between 1 and 100.")
print("Please select the difficulty level: ")
print("1. Easy (10 chances)")
print("2. Medium (5 chances)")
print("3. Hard (3 chances)")

diff_level = int(input("Enter your choice: "))
chances = 0

if diff_level == 1:
    chances = 10
    print("Great! You have selected the Easy difficulty level.")
elif diff_level == 2:
    chances = 5
    print("Great! You have selected the Medium difficulty level.")
elif diff_level == 3:
    chances = 3
    print("Great! You have selected the Hard difficulty level.")
else:
    print("Choose the correct level first!")
    sys.exit(1)

print("Let's start the game!")

curr = 1
guessed_num = random.randint(1, 100)

while curr <= chances:
    num = int(input("Enter your guess: "))
    
    if num == guessed_num:
        print(f"Congratulations! You guessed the correct number in {curr} attempts.")
        sys.exit(0)
    elif num < guessed_num:
        print(f"Incorrect! The number is greater than {num}")
    else:
        print(f"Incorrect! The number is less than {num}")
    
    curr += 1

print(f"You failed to guess. Actual number was: {guessed_num}")