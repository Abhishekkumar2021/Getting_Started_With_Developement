#include<iostream>
using namespace std;

int main(){
    srand(time(0));
    int diffLevel, chances;
    cout << "Welcome to the number guessing game!"<< endl;
    cout << "I'm thinking of a number between 1 and 100." << endl;
    cout <<"Please select the difficulty level: " << endl;
    cout << "1. Easy (10 chances)" << endl;
    cout << "2. Medium (5 chances)" << endl;
    cout << "3. Hard (3 chances)" << endl;
    cout << "Enter your choice: ";
    cin >> diffLevel;
    if(diffLevel == 1){
        chances = 10;
        cout << "Great! You have selected the Easy difficulty level." << endl;
    }
    else if(diffLevel == 2){
        chances = 5;
        cout << "Great! You have selected the Medium difficulty level." << endl;
    }
    else if(diffLevel == 3) {
        chances = 3;
        cout << "Great! You have selected the Hard difficulty level." << endl;
    }
    else{
         cout << "Choose the correct level first!" << endl;
         exit(0);
    }

    cout << "Let's start the game!" << endl;

    int curr = 1;
    int guessedNum = rand()%100 + 1;
    while(curr <= chances){
        int num;
        cout << "Enter your guess: ";
        cin >> num;
        if(num == guessedNum){
            cout << "Congratulations! You guessed the correct number in " << curr <<  " attempts." << endl;
            return 0;
        }
        else if(num < guessedNum){
            cout << "Incorrect! The number is greater than " << num << endl;
        }
        else{
            cout << "Incorrect! The number is less than " << num << endl;
        }
        curr++;
    }

    cout << "You failed to guess! Actual number was: " << guessedNum << endl;
}