#include <bits/stdc++.h>
using namespace std;

void printRed(string s)
{
    cout << "\033[1;31m" << s << "\033[0m";
}

void printYellow(string s)
{
    cout << "\033[1;33m" << s << "\033[0m";
}

void printGreen(string s)
{
    cout << "\033[1;32m" << s << "\033[0m";
}

int main()
{
    string secret = "MANGO";
    int n = secret.size();

    string guess;

    vector<int> freq(26, 0);
    for (char c : secret)
    {
        freq[c - 'A']++;
    }

    int total = 5;

    for (int i = 1; i <= total; i++)
    {
        cout << "Enter guess #" << i << ": ";
        cin >> guess;

        // conditional check
        if (guess.size() != n)
        {
            cout << "Invalid guess!" << endl;
            continue;
        }

        // Make all characters uppercase
        for (auto &c : guess)
        {
            c = toupper(c);
        }

        // Output (Red, Yellow, Green) -> (Not in secret, In secret but in wrong position, In secret and in correct position)
        int color[n] = {0}; // (Red, Yellow, Green) -> (0, 1, 2)
        vector<int> temp = freq;

        // Green color
        for (int i = 0; i < n; i++)
        {
            if (guess[i] == secret[i])
            {
                color[i] = 2;
                temp[guess[i] - 'A']--;
            }
        }

        // Yellow color
        for (int i = 0; i < n; i++)
        {
            if (guess[i] != secret[i] && temp[guess[i] - 'A'] >= 1)
            {
                color[i] = 1;
                temp[guess[i] - 'A']--;
            }
        }

        // Output
        for (int i = 0; i < n; i++)
        {
            string ans;
            ans.push_back(guess[i]);
            ans.push_back(' ');
            if (color[i] == 0)
            {
                // Print in red
                printRed(ans);
            }
            else if (color[i] == 1)
            {
                // Print in yellow
                printYellow(ans);
            }
            else
            {
                // Print in green
                printGreen(ans);
            }
        }
        cout << endl;

        if (guess == secret)
        {
            cout << "You win!" << endl;
            break;
        }
    }
}