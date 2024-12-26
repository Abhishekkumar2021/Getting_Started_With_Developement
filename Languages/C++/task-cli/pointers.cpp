#include<iostream>
using namespace std;

void print(char* str[]){
    cout << str[0] << endl;
}

int main(){
    int x = 10;
    int *p = &x;
    cout << "Value of x: " << x << endl;
    cout << "Address of x: " << &x << endl;
    cout << "Value of p: " << p << endl;
    cout << "Value through p: " << *p << endl;

    // Dynamic memory allocation
    int *arr = new int[5];
    for(int i = 0; i < 5; i++){
        arr[i] = i; // arr[i] is equivalent to *(arr + i): Value at address arr + i
    }

    char *str = new char[5];
    str[0] = 'H';
    str[1] = 'e';
    str[2] = 'l';
    str[3] = 'l';
    str[4] = 'o';

    cout << "Array: ";
    for(int i = 0; i < 5; i++){
        cout << arr[i] << " ";
    }

    cout << endl << "String: ";
    for(int i = 0; i < 5; i++){
        cout << str[i];
    }

    delete[] arr;

    char* str2 = "Hello";
    cout << str2 << endl;
    char **ptr = &str2;

    // double dimension array
    char **args = new char*[5];

    for(int i = 0; i < 5; i++){
        args[i] = new char[5];
    }

    for(int i = 0; i < 5; i++){
        for(int j = 0; j < 5; j++){
            args[i][j] = 'A' + i;
        }
    }

    cout << args << endl;
    cout << *args << endl;
    cout << **args << endl;

    cout << args[0] << endl;

    cout << "Double dimension array: " << endl;
    for(int i = 0; i < 5; i++){
        for(int j = 0; j < 5; j++){
            cout << args[i][j] << " ";
        }
        cout << endl;
    }

    print(args);
}