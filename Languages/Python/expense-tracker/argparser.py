#! /Users/abhishek/Dev/Akansha/Development/.venv/bin/python3
import sys

class Argument:
    def __init__(self, flag: str, description: str = None, choices: list[str] = None):
        self.flag = flag
        self.description = description
        self.choices = choices

    def get_name(self):
        ans: str = self.flag.replace("<", "").replace(">", "")
        return ans.strip()


class Option:
    def __init__(
        self,
        flag: str,
        description: str = None,
        choices: list[str] = None,
        required: bool = False,
    ):
        self.flag = flag
        self.description = description
        self.required = required
        self.choices = choices
        
    def get_name(self):
        ans: str = ""
        n = len(self.flag)
        idx = 0
        
        while idx < n:
            if self.flag[idx] == "-" and self.flag[idx+1] == "-":
                i = idx + 2
                while i < n and self.flag[i] != " ":
                    ans += self.flag[i]
                    i += 1
                return ans
            else: 
                idx += 1
            
        return None

class ArgParser:
    def __init__(self) -> None:
        self.arguments: list[Argument] = []
        self.options: list[Option] = []

        # To store answers
        self.parsed_arguments: list[str] = []
        self.parsed_options: dict = {}

    def add_argument(self, argument: Argument):
        self.arguments.append(argument)
        return self

    def add_option(self, option: Option):
        self.options.append(option)
        return self

    def get_parsed_options(self) -> dict:
        return self.parsed_options

    def get_parsed_arguments(self) -> list[str]:
        return self.parsed_arguments
    
    def parse_arguments(self, argv: list[str]) -> None:
        # Parse all arguments
        n = len(argv)
        idx = 0
        while idx < n:
            if argv[idx][0] == "-":
                idx += 2
            else:
                self.parsed_arguments.append(argv[idx])
                idx += 1

        a = len(self.parsed_arguments)
        b = len(self.arguments)
        if a < b:
            error = "Error: Missing arguments "
            i = a
            while i < b:
                error += self.arguments[i].get_name() + " "
                i += 1
            
            print(error)
            sys.exit(1)
        
        # Handle choice
        for idx, arg in enumerate(self.parsed_arguments):
            argument = self.arguments[idx]
            if argument.choices is not None:
                if arg not in argument.choices:
                    allowed_choices: str = ", ".join(argument.choices)
                    key = argument.get_name()
                    error: str = f"Error: Invalid value for {key}. Allowed choices are {allowed_choices}"
                    print(error)
                    sys.exit(1)
        

    def parse_options(self, argv: list[str]) -> None:
        n = len(argv)
        idx = 0
        while idx < n:
            if argv[idx][0] == "-":
                # Handle option
                key = argv[idx]
                val = argv[idx+1]
                
                for option in self.options:
                    if key in option.flag:
                        key = option.get_name()
                        self.parsed_options[key] = val
                        break
                
                idx += 2
            else:
                idx += 1
    
    def get_option_by_name(self, name: str) -> Option | None:
        for option in self.options:
            if name in option.flag:
                return option
        
        return None
            
        return None
    def parse(self, argv: list[str] = sys.argv) -> None:
        argv = argv[1:]
        self.parse_arguments(argv)
        self.parse_options(argv)
        
        
        # Handle Choices for options
        for key in self.parsed_options:
            val = self.parsed_options[key]
            option = self.get_option_by_name(key)
            if option is None:
                continue
            
            if option.choices is not None:
                if val not in option.choices:
                    allowed_choices: str = ", ".join(option.choices)
                    error: str = f"Error: Invalid value for {key}. Allowed choices are {allowed_choices}"
                    print(error)
                    sys.exit(1)
                    
        # Handle required condition for option
        error = "Error: Missing required option(s) "
        missing = False
        for option in self.options:
            if option.required == True:
                key = option.get_name()
                if key not in self.parsed_options.keys():
                    error += key + " "
                    missing = True
        
        if missing:
            print(error)
            sys.exit(1)
    