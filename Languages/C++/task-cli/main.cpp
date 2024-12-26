#include <iostream>
#include <set>
#include <fstream>
#include <sstream>
using namespace std;

long long CURRENT_ID = 0;

enum Status
{
    TODO,
    IN_PROGRESS,
    DONE
};

string convertToString(Status status)
{
    switch (status)
    {
    case TODO:
        return "TODO";
    case IN_PROGRESS:
        return "IN_PROGRESS";
    case DONE:
        return "DONE";
    }
}

Status convertToStatus(string status)
{
    if (status == "TODO")
    {
        return TODO;
    }
    else if (status == "IN_PROGRESS")
    {
        return IN_PROGRESS;
    }
    else if (status == "DONE")
    {
        return DONE;
    }
    return TODO;
}

class Task
{
public:
    long long id;
    string title;
    Status status;

    Task(string title)
    {
        this->id = CURRENT_ID++;
        this->title = title;
        this->status = TODO;
    }

    Task(long long id, string title, Status status)
    {
        this->id = id;
        this->title = title;
        this->status = status;
    }

    void updateStatus(Status status)
    {
        this->status = status;
    }

    void show()
    {
        cout << "--------------------------------" << endl;
        cout << "ID: " << id << endl;
        cout << "Title: " << title << endl;
        cout << "Status: " << convertToString(status) << endl;
        cout << "--------------------------------" << endl;
    }
};

int main(int argc, char *argv[])
{
    vector<string> args(argv, argv + argc);
    if (argc < 2)
    {
        cout << "Usage: " << args[0] << " <command> <options>" << endl;
        return 1;
    }

    string command = args[1];
    set<string> commands = {
        "list",
        "add",
        "delete",
        "update",
        "show"};

    if (commands.find(command) == commands.end())
    {
        cout << "Invalid command: " << command << endl;
        return 1;
    }
    vector<Task> tasks;

    // Load task from tasks.txt
    ifstream file("tasks.txt", ios::in);
    if (file.is_open())
    {
        string line;
        while (getline(file, line))
        {
            // ID Title Status
            stringstream ss(line);
            long long id;
            string title = "";
            string status;
            ss >> id >> status;

            string curr;
            while (ss >> curr)
            {
                title += curr + " ";
            }

            title.pop_back();
            Task task(id, title, convertToStatus(status));
            tasks.push_back(task);

            CURRENT_ID = max(CURRENT_ID, id + 1);
        }
        file.close();
    }

    if (command == "add")
    {
        if (argc < 3)
        {
            cout << "Usage: " << args[0] << " add \"<title>\"" << endl;
            return 1;
        }
        string title = args[2];
        Task task(title);
        tasks.push_back(task);

        // Write tasks to tasks.txt
        ofstream file("tasks.txt", ios::out);
        for (Task task : tasks)
        {
            file << task.id << " " << convertToString(task.status) << " " << task.title << endl;
        }
        file.close();
    }
    else if (command == "list")
    {
        if(argc == 3){
            string status = args[2];
            if( status != "TODO" && status != "IN_PROGRESS" && status != "DONE")
            {
                cout << "Invalid status! Status should be one of [TODO, IN_PROGRESS, DONE]" << endl;
                return 1;
            }

            for (Task task : tasks)
            {
                if (convertToString(task.status) == status)
                {
                    task.show();
                }
            }
            return 0;
        }else{
            for (Task task : tasks)
            {
                task.show();
            }
        }
    }
    else if (command == "delete")
    {
        if(argc < 3)
        {
            cout << "Usage: " << args[0] << " delete <id>" << endl;
            return 1;
        }

        long long id = stoll(args[2]);
        bool found = false;
        for (int i = 0; i < tasks.size(); i++)
        {
            if (tasks[i].id == id)
            {
                found = true;
                tasks.erase(tasks.begin() + i);
                break;
            }
        }

        if (!found)
        {
            cout << "Task not found!" << endl;
            return 1;
        }

        // Write tasks to tasks.txt
        ofstream file("tasks.txt", ios::out);
        for (Task task : tasks)
        {
            file << task.id << " " << convertToString(task.status) << " " << task.title << endl;
        }
        file.close();
    }
    else if (command == "update")
    {
        if(argc < 5)
        {
            cout << "Usage: " << args[0] << " update <id> STATUS/TITLE <status:[TODO, IN_PROGRESS, DONE]>/<title>" << endl;
            return 1;
        }

        if(args[3] == "STATUS")
        {
            long long id = stoll(args[2]);
            string status = args[4];
            if(status != "TODO" && status != "IN_PROGRESS" && status != "DONE")
            {
                cout << "Invalid status! Status should be one of [TODO, IN_PROGRESS, DONE]" << endl;
                return 1;
            }
            Status newStatus = convertToStatus(status);
            bool found = false;
            for (Task &task : tasks)
            {
                if (task.id == id)
                {
                    found = true;
                    task.updateStatus(newStatus);
                    break;
                }
            }

            if (!found)
            {
                cout << "Task not found!" << endl;
                return 1;
            }
        }
        else if(args[3] == "TITLE")
        {
            long long id = stoll(args[2]);
            string title = args[4];
            bool found = false;
            for (Task &task : tasks)
            {
                if (task.id == id)
                {
                    found = true;
                    task.title = title;
                    break;
                }
            }

            if (!found)
            {
                cout << "Task not found!" << endl;
                return 1;
            }
        }else{
            cout << "Invalid option!" << endl;
            return 1;
        }

        // Write tasks to tasks.txt
        ofstream file("tasks.txt", ios::out);
        for (Task task : tasks)
        {
            file << task.id << " " << convertToString(task.status) << " " << task.title << endl;
        }
        file.close();
    }
    else if (command == "show")
    {
        if(argc < 3)
        {
            cout << "Usage: " << args[0] << " show <id>" << endl;
            return 1;
        }

        long long id = stoll(args[2]);
        for(Task task : tasks)
        {
            if(task.id == id)
            {
                task.show();
                return 0;
            }
        }
        cout << "Task not found!" << endl;
        return 1;
    }
}